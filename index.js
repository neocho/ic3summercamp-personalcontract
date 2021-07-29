let contractAddress = "0x4aD9f03bB9D9058982100ed4385EC0B99F587069"; 
let user; 
let personalContract; 
let abiJson = [{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function createContract() {
    if(user){
        let bytecode = await web3.eth.getCode(contractAddress);

        console.log("Get Bytecode: " + bytecode);
        
		await new web3.eth.Contract(abiJson)
			.deploy({
				data: bytecode, 
            })
			.send({
				from: user,
                gas: 1500000,
                gasPrice: '80000000'
			}, function(error, txHash){
                console.log(error);
                console.log(txHash);
            })
            .on('receipt', function(receipt){
                console.log(receipt.contractAddress);
            })
            .on('confirmation', function(confirmationNumber, receipt){ 
                console.log("confirmationNumber: " + confirmationNumber);
             })
            .then((contractInstance)=>{
                personalContract = contractInstance.options.address;
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




