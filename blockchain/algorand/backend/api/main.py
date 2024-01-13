from fastapi import FastAPI
import traceback
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.join(current_dir, '..', '..')
sys.path.insert(0, root_dir)

from backend.algo_services.asset_manager import create_asset, transfer_asset, freeze_asset, opt_in_to_asset
from backend.scripts.algorand_utils import AlgorandWalletManager
from backend.scripts.config import user_wallet, default_wallet
from backend.scripts.upload_certificate import load_ipfs_hashes, get_image_url, users
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

algod_user = AlgorandWalletManager()
algod_client = algod_user.initialize_algod_client()
default_account = default_wallet.list_keys()[0]
user_account = user_wallet.list_keys()[1]
se_private_key = user_wallet.export_key(user_account)
re_private_key = default_wallet.export_key(default_account)

ipfs_hashes = load_ipfs_hashes()
user_hash_map = {user['name']: ipfs_hash for user, ipfs_hash in zip(users, ipfs_hashes)}

validated_users = [
    {"username": "Mubarek", "password": "Muba"},
    {"username": "Misganaw", "password": "misge"},
]

security = HTTPBasic()


def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
    for user in validated_users:
        if credentials.username == user["username"] and credentials.password == user["password"]:
            return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Basic"},
    )


@app.post("/login")
def login(credentials: HTTPBasicCredentials = Depends(security)):
    user = authenticate_user(credentials)
    return {"message": "Login successful for user: " + user["username"]}


user_asset_ids = {}


@app.post("/create_asset")
def create_asset_endpoint(name: str, email: str, user=Depends(authenticate_user)):
    sender_address = user_account
    sender_private_key = se_private_key
    ipfs_hash = user_hash_map.get(user['username'])
    asset_url = get_image_url(ipfs_hash) if ipfs_hash else None
    asset_creation_result, asset_id = create_asset(sender_address, sender_private_key, asset_url)
    user_asset_ids[user['username']] = asset_id
    print(user_asset_ids)
    return asset_creation_result


@app.post("/transfer_asset")
def transfer_asset_endpoint(asset_id: int):
    sender_address = user_account
    sender_private_key = se_private_key
    receiver_address = default_account
    return transfer_asset(sender_address, sender_private_key, receiver_address, asset_id, amount)


@app.post("/freeze_asset")
def freeze_asset_endpoint(asset_id: int, freeze_state: bool):
    receiver_address = default_account
    manager_address = user_account
    manager_private_key = se_private_key
    return freeze_asset(manager_address, manager_private_key, receiver_address, asset_id, freeze_state)


@app.post("/opt_in_to_asset")
def opt_in_to_asset_endpoint(asset_id: int):
    receiver_address = default_account
    receiver_private_key = re_private_key
    return opt_in_to_asset(receiver_address, receiver_private_key, asset_id)


@app.post("/claim_certificate")
def claim_certificate_endpoint(user = Depends(authenticate_user)):
    try:
        ipfs_hash = user_hash_map.get(user['username'])
        asset_url = get_image_url(ipfs_hash) if ipfs_hash else None
        asset_id = user_asset_ids.get(user['username'])
        
        if not asset_id:
            asset_creation_result, asset_id = create_asset(user_account, se_private_key, asset_url)
            user_asset_ids[user['username']] = asset_id

        opt_in_result = opt_in_to_asset(default_account, re_private_key, asset_id)

        transfer_result = transfer_asset(user_account, se_private_key, default_account, asset_id, 1)

        freeze_result = freeze_asset(user_account, se_private_key, default_account, asset_id, True)

        return {"message": "Certificate claimed successfully", "certificate_url": asset_url}
    except Exception as e:
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"detail": str(e)})
