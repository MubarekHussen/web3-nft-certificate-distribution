import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.join(current_dir, '..', '..')
sys.path.insert(0, root_dir)

from backend.scripts.algorand_utils import AlgorandWalletManager

algod_user = AlgorandWalletManager()

DEFAULT_KMD_WALLET_NAME = "unencrypted-default-wallet"
DEFAULT_KMD_WALLET_PASSWORD = ""
default_wallet = algod_user.generate_user_wallet(wallet_name=DEFAULT_KMD_WALLET_NAME, wallet_password=DEFAULT_KMD_WALLET_PASSWORD)

user_wallet = algod_user.generate_user_wallet(wallet_name="Mubarek", wallet_password="Muba@wallet14")


def keep_specific_accounts(user_wallet, accounts_to_keep):
    # Get the list of all account addresses in the wallet
    accounts = user_wallet.list_keys()

    # Iterate over all the accounts
    for account_address in accounts:
        # If the account is not in the list of accounts to keep, delete it
        if account_address not in accounts_to_keep:
            user_wallet.delete_key(account_address)
