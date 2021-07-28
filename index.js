function createContract() {
  
}

function getBalance() {
    let address = document.getElementById("address").value

    try {
        web3.eth.getBalance(address, function (error, result) {
            if (!error) {
                document.getElementById("output").innerHTML = result + "wei";
            }
        });
    } catch (err) {
        document.getElementById("output").innerHTML = err;
    }
}

window.addEventListener("load", function() {
    document.getElementById("createContractButton").onclick = createContract;
    document.getElementById("getBalance").onclick = getBalance;

    if (typeof web3 !== 'undefined'){
        console.log("Web3 Found: " + web3.currentProvider.constructor.name);
        window.web3 = new Web3(web3.currentProvider);
    }else{
        console.log("No Web3 Found. Setting up a HTTP Provider"); 
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/fd0f35f807c24ce1b0b5d34547fac7cc"));
    }

});