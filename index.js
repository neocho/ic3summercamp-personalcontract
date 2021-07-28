let contractAddress = "0x74Cc97F1C0B94B2491B64033081358b106A79C66"; 
let abi_json = {"result":"[{\"inputs\":[],\"name\":\"retrieve\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"num\",\"type\":\"uint256\"}],\"name\":\"store\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]"};
let user; 
let personalContract; 

async function createContract() {
    if(user){
        let accounts = await web3.eth.getAccounts(); 
        let usersAccount = accounts[0];

        let contract_abi = JSON.parse(abi_json.result);

        personalContract = new web3.eth.Contract(contract_abi, contractAddress, {
            from: usersAccount, 
        });

    }else {
        console.log("No Wallet Connected.");
    }


    document.getElementById("createContractButton").innerHTML = "Contract Created";

    console.log("Contract Created");

}

async function setValue() {
    const sentValue = await personalContract.methods.store("1").send();
    document.getElementById("storeButton").innerHTML = sentValue;
}

async function getValue() {
    const storedValue = await personalContract.methods.retrieve().call();
    document.getElementById("outputValue").innerHTML = storedValue;
}

async function connectWallet() {
    if(window.ethereum){
        window.web3 = new Web3(ethereum);

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
            user = accounts[0];
            console.log(user);
        }catch(error){
            console.log("User Denied Access");
        }

        let firstHalf = user.substring(0, 5); 
        let secondHalf = user.substring(user.length-5,user.length);

        document.getElementById("connectWalletButton").innerHTML = firstHalf + "..." + secondHalf; 

    }else{
        console.log("Download Metamask or Ethereum compatible browser.");
    }
}

window.onload = () => {
    document.getElementById("connectWalletButton").addEventListener("click", connectWallet);
    document.getElementById("createContractButton").addEventListener("click", createContract);
    document.getElementById("storeButton").addEventListener('click', setValue);
    document.getElementById("outputButton").addEventListener('click', getValue);
};




