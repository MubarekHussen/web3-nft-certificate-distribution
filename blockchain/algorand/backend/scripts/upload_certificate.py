import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

users = [
    {"name": "Misganaw Berihun", "email": "msganawberihun10@gmail.com", "date": "January 12, 2024"},
    {"name": "Mubarek Hussen", "email": "mubahussen2014@gmail.com", "date": "January 12, 2024"},
]

JWT = os.getenv('JWT')


def upload_file_to_ipfs(user):
    url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    filename = f"./assets/certificates/{user['name']}_certificate.png"
    headers = {
        "pinataMetadata": '{"name": "' + user['name'] + '_certificate"}',
        "Authorization": "Bearer " + JWT
    }

    if not os.path.isfile(filename):
        print(f"File {filename} not found. Skipping upload for {user['name']}.")
        return None

    with open(filename, 'rb') as f:
        response = requests.post(url, files={"file": f}, headers=headers)

    if response.status_code == 200:
        print(f"Successfully uploaded {user['name']}'s certificate.")
        return response.json()["IpfsHash"]
    else:
        print(f"Failed to upload {user['name']}'s certificate. Response: {response.text}")
        return None


def get_image_url(ipfs_hash):
    return f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"


def save_ipfs_hashes(ipfs_hashes):
    with open('ipfs_hashes.json', 'w') as f:
        json.dump(ipfs_hashes, f)


def load_ipfs_hashes():
    try:
        with open('ipfs_hashes.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []


ipfs_hashes = load_ipfs_hashes()

if not ipfs_hashes:
    ipfs_hashes = [upload_file_to_ipfs(user) for user in users]
    save_ipfs_hashes(ipfs_hashes)

image_urls = [get_image_url(ipfs_hash) for ipfs_hash in ipfs_hashes if ipfs_hash is not None]
print(image_urls)
