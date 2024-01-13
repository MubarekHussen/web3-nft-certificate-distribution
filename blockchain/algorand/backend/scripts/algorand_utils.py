from algosdk import kmd, mnemonic
from algosdk.wallet import Wallet
from algosdk.v2client import algod  
from urllib.error import HTTPError


class AlgorandWalletManager:
    """
    Create wallets, list available wallets, fetch account in wallet and query account information
    Also, get passphrase(mnemonic) and public and private keys from mnemonic
    """
    def __init__(self) -> None:
        pass
    
    def establish_kmd_client(self):
        kmd_address = "http://localhost:4002"
        kmd_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        kmd_client = kmd.KMDClient(kmd_token, kmd_address)
        return kmd_client

    def generate_user_wallet(self, wallet_name, wallet_password):
        client = self.establish_kmd_client()
        try:
            wallet = Wallet(wallet_name, wallet_password, client)
            return wallet
        except HTTPError:
            print("Bad Request")
    
    def get_existing_user_wallet(self, wallet_name, wallet_password):
        client = self.establish_kmd_client()
        try:
            wallet = Wallet(wallet_name, wallet_password, client)
            return wallet.list_keys()
        except HTTPError:
            print("Bad Request")

    def fetch_account_address(self, wallet_object):
        # Get the list of account addresses in the wallet
        accounts = wallet_object.list_keys()

        # If there are no accounts in the wallet, return None
        if not accounts:
            return None

        # Otherwise, return the address of the first account
        return accounts[0]

    def enumerate_wallets(self):
        client = self.establish_kmd_client()
        wallets = client.list_wallets()
        return wallets

    def fetch_passphrase(self, wallet_object):
        mdk = wallet_object.ex
        mnemonic_phrase = mnemonic.from_master_derivation_key(mdk)
        return mnemonic_phrase

    def fetch_public_key(self,mnemonic_str):
        return mnemonic.to_public_key(mnemonic=mnemonic_str)

    def fetch_private_key(self, mnemonic_str):
        return mnemonic.to_private_key(mnemonic=mnemonic_str)

    def initialize_algod_client(self):
        algod_address = "http://localhost:4001" 
        algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"  
        algod_client = algod.AlgodClient(algod_token, algod_address)
        return algod_client

    def fetch_account_info(self, account_address):
        algod_client = self.initialize_algod_client()
        account_info = algod_client.account_info(account_address) 
        return account_info
