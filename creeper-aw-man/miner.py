import hashlib
import requests

import sys

from uuid import uuid4

from timeit import default_timer as timer

import time

import random

checked = []


def proof_of_work(last_proof, difficulty):
    """
    Multi-Ouroboros of Work Algorithm
    - Does hash(last_proof, proof) contain N leading zeroes, where N is the current difficulty level?
    - IE:  last_hash: difficulty 4: 00001235..., new_hash: difficulty 5: 00000142...
    - p is the previous proof, and p' is the new proof
    - Use the same method to generate SHA-256 hashes as the examples in class
    """

    start = timer()
        
    print("Searching for next proof")

    proof = last_proof


    while valid_proof(last_proof, proof, difficulty) is False:
        proof += 1
        
    print("Proof found: " + str(proof) + " in " + str(timer() - start))
    return proof


def valid_proof(last_proof, proof, difficulty):
    """
    - Does hash(last_proof, proof) contain N leading zeroes, where N is the current difficulty level?
    - IE:  last_hash: difficulty 4: 00001235..., new_hash: difficulty 5: 00000142...
    """

    new_guess = f'{last_proof}{proof}'.encode()

    new_hash = hashlib.sha256(new_guess).hexdigest()

    return new_hash[:difficulty] == '0' * difficulty


if __name__ == '__main__':
    # What node are we interacting with?
    if len(sys.argv) > 1:
        node = sys.argv[1]
    else:
        node = "https://lambda-treasure-hunt.herokuapp.com/api/bc"

    headers = {
            "authorization": "Token 012d6dc740a0af2c6321ccf5c2754d1eba3ba1bc", 
            "content-type": "application/JSON"
            }
    # Run forever until interrupted
    while True:
        post_data = {}
        r = requests.get(url=node + "/last_proof", headers=headers)
        time.sleep(1)

        # Get the last proof from the server
        while post_data == {}:
            data = r.json()
            new_proof = proof_of_work(data.get('proof'), data.get('difficulty'))
            check = requests.get(url=node + "/last_proof", headers=headers)
            if r.json().get('proof') == check.json().get('proof'):
                post_data = {"proof": new_proof}
                time.sleep(1)
            else:
                print(r.json().get('proof'), check.json().get('proof'))
                r = check


        s = requests.post(url=node + "/mine", json=post_data, headers=headers)
        data2 = s.json()
        if data2.get('cooldown') != 115.0:
            print(data2.get('messages'))
            print(data2.get('errors'))
        elif data2.get('cooldown') == 115.0:
            print(data.get('cooldown'))
            time.sleep(115)
        else:
            print(data.get('errors'))