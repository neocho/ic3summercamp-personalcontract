let contractAddress = "0x74Cc97F1C0B94B2491B64033081358b106A79C66"; 
let byteCode = {
	"generatedSources": [],
	"linkReferences": {},
	"object": "0x608060405234801561001057600080fd5b5061012f806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d146051575b600080fd5b603d6069565b6040516048919060c2565b60405180910390f35b6067600480360381019060639190608f565b6072565b005b60008054905090565b8060008190555050565b60008135905060898160e5565b92915050565b60006020828403121560a057600080fd5b600060ac84828501607c565b91505092915050565b60bc8160db565b82525050565b600060208201905060d5600083018460b5565b92915050565b6000819050919050565b60ec8160db565b811460f657600080fd5b5056fea2646970667358221220c019e4614043d8adc295c3046ba5142c603ab309adeef171f330c51c38f1498964736f6c63430008040033",
	"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x12F DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH1 0x32 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x2E64CEC1 EQ PUSH1 0x37 JUMPI DUP1 PUSH4 0x6057361D EQ PUSH1 0x51 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x3D PUSH1 0x69 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x48 SWAP2 SWAP1 PUSH1 0xC2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x67 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH1 0x63 SWAP2 SWAP1 PUSH1 0x8F JUMP JUMPDEST PUSH1 0x72 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH1 0x89 DUP2 PUSH1 0xE5 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH1 0xA0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xAC DUP5 DUP3 DUP6 ADD PUSH1 0x7C JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0xBC DUP2 PUSH1 0xDB JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH1 0xD5 PUSH1 0x0 DUP4 ADD DUP5 PUSH1 0xB5 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0xEC DUP2 PUSH1 0xDB JUMP JUMPDEST DUP2 EQ PUSH1 0xF6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xC0 NOT 0xE4 PUSH2 0x4043 0xD8 0xAD 0xC2 SWAP6 0xC3 DIV PUSH12 0xA5142C603AB309ADEEF171F3 ADDRESS 0xC5 SHR CODESIZE CALL 0x49 DUP10 PUSH5 0x736F6C6343 STOP ADDMOD DIV STOP CALLER ",
	"sourceMap": "141:356:0:-:0;;;;;;;;;;;;;;;;;;;"
};

let user; 
let personalContract; 
let abi = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


async function createContract() {
    if(user){
        let block = await web3.eth.getBlock("latest");
        let gasLimit = block.gasLimit; 

        console.log("GasLimit: ", gasLimit);
        console.log("Get Bytecode: ", byteCode);
        
		await new web3.eth.Contract(abi)
			.deploy({
				data: byteCode.object, 
            })
			.send({
				from: user,
                gas: 1500000,
                gasPrice: '8000000000'
			}, function (err,tx) {
                console.log(err)
                console.log(tx);
            })
            .on('error', function(err) {
                console.log(err);
            })
            .on('receipt', function(receipt){
                console.log(receipt.contractAddress);
            })
            .on('confirmation', function(confirmationNumber, receipt){ 
                console.log("confirmationNumber: " + confirmationNumber);
             })
            .then(function(contractInstance) {
                personalContract = contractInstance.options.address;
                console.log(personalContract);
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




