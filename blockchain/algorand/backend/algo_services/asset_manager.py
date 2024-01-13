from algosdk import transaction
from algosdk.v2client import algod


algod_address = "http://localhost:4001"
algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address)


def create_asset(sender_address, sender_private_key, asset_url):
    sp = algod_client.suggested_params()
    txn = transaction.AssetConfigTxn(
        sender=sender_address,
        sp=sp,
        default_frozen=False,
        unit_name="rug",
        asset_name="Really Useful Gift",
        manager=sender_address,
        reserve=sender_address,
        freeze=sender_address,
        clawback=sender_address,
        url=asset_url,
        total=1,
        decimals=0,
    )

    stxn = txn.sign(sender_private_key)
    txid = algod_client.send_transaction(stxn)
    print(f"Sent asset create transaction with txid: {txid}")
    results = transaction.wait_for_confirmation(algod_client, txid, 4)
    print(f"Result confirmed in round: {results['confirmed-round']}")

    asset_id = results['asset-index']
    print(f"Created asset with ID: {asset_id}")

    return results, asset_id


def transfer_asset(sender_address, sender_private_key, receiver_address, asset_id, amount):
    sp = algod_client.suggested_params()
    amount = 1
    xfer_txn = transaction.AssetTransferTxn(
        sender=sender_address,
        sp=sp,
        receiver=receiver_address,
        amt=amount,
        index=asset_id,
    )
    signed_xfer_txn = xfer_txn.sign(sender_private_key)
    txid = algod_client.send_transaction(signed_xfer_txn)
    print(f"Sent transfer transaction with txid: {txid}")

    results = transaction.wait_for_confirmation(algod_client, txid, 4)
    print(f"Result confirmed in round: {results['confirmed-round']}")

    acct_info = algod_client.account_info(receiver_address)
    matching_asset = [
        asset
        for asset in acct_info["assets"]
        if asset["asset-id"] == asset_id
    ].pop()
    assert matching_asset["amount"] == amount

    return results


def freeze_asset(manager_address, manager_private_key, receiver_address, asset_id, freeze_state):
    sp = algod_client.suggested_params()
    freeze_txn = transaction.AssetFreezeTxn(
        sender=manager_address,
        sp=sp,
        index=asset_id,
        target=receiver_address,
        new_freeze_state=freeze_state,
    )
    signed_freeze_txn = freeze_txn.sign(manager_private_key)
    txid = algod_client.send_transaction(signed_freeze_txn)
    print(f"Sent freeze transaction with txid: {txid}")

    results = transaction.wait_for_confirmation(algod_client, txid, 4)
    print(f"Result confirmed in round: {results['confirmed-round']}")

    return results


def opt_in_to_asset(sender_address, sender_private_key, asset_id):
    sp = algod_client.suggested_params()
    optin_txn = transaction.AssetOptInTxn(
        sender=sender_address, sp=sp, index=asset_id
    )
    signed_optin_txn = optin_txn.sign(sender_private_key)
    txid = algod_client.send_transaction(signed_optin_txn)
    print(f"Sent opt in transaction with txid: {txid}")

    results = transaction.wait_for_confirmation(algod_client, txid, 4)
    print(f"Result confirmed in round: {results['confirmed-round']}")

    acct_info = algod_client.account_info(sender_address)
    matching_asset = [
        asset
        for asset in acct_info["assets"]
        if asset["asset-id"] == asset_id
    ].pop()

    if matching_asset["amount"] != 0:
        print(f"Account already has {matching_asset['amount']} amount of the asset")
    else:
        print("Account has 0 amount of the asset")

    if matching_asset["is-frozen"]:
        print("The asset is frozen")
    else:
        print("The asset is not frozen")

    return results
