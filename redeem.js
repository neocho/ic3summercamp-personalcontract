let contractAddress = "0x52F5B1eC195d5456f4E3f141643833c1d5D11B7d";
let abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"who","type":"address"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"Blocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"when","type":"uint256"},{"indexed":true,"internalType":"address","name":"who","type":"address"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"Cancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"when","type":"uint256"},{"indexed":true,"internalType":"address","name":"who","type":"address"}],"name":"NewEvent","type":"event"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"when","type":"uint256"}],"name":"addEvent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"a","type":"address"}],"name":"approveAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"blockAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eventHash","type":"uint256"}],"name":"destroyPastEvents","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"events","outputs":[{"internalType":"bool","name":"enabled","type":"bool"},{"internalType":"uint256","name":"when","type":"uint256"},{"internalType":"address","name":"who","type":"address"},{"internalType":"bool","name":"open","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"getEvent","outputs":[{"components":[{"internalType":"bool","name":"enabled","type":"bool"},{"internalType":"uint256","name":"when","type":"uint256"},{"internalType":"address","name":"who","type":"address"},{"internalType":"bool","name":"open","type":"bool"}],"internalType":"struct PersonalContractProxy.Event","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numEvents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner_url","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"redeemCard","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"scheduleSlot","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"seedSlots","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"whenFromNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
let byteCode = "";
let user; 

async function signKey(key) {
    const privateKey = document.getElementById("privateKey").value;

    if(privateKey !== undefined) {
        // Pass private key to metamask 
        const account = await web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log(account);

        const publicAddress = account.address; 
        console.log(publicAddress);

        let data = publicAddress; 

        // Sign 
        const signedMessageResponse = await web3.eth.accounts.sign(data, privateKey);
        console.log(signedMessageResponse);

        if(signedMessageResponse !== undefined){

            //Get info from signed message 
            const messageHash = signedMessageResponse.messageHash; 
            const r = signedMessageResponse.r; 
            const s = signedMessageResponse.s; 
            const v = signedMessageResponse.v; 

            // Call contract function 
            const contract = new web3.eth.Contract(abi, contractAddress, {
                from: user
            });

            const sentValue = await contract.methods.redeemCard(messageHash,v,r,s).send();

            console.log(sentValue);
        }

    }
}

async function init() {
    if(window.ethereum){
        window.web3 = new Web3(ethereum);

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
            user = accounts[0];
            console.log(user);
        }catch(error){
            console.log("User Denied Access");
        }
    }else{
        console.log("Download Metamask or Ethereum compatible browser.");
    }
}

window.onload = () => {
    init();

    document.getElementById("redeemButton").addEventListener("click", signKey);
}