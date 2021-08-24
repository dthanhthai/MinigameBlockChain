$(document).ready(function () {

    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_emit_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "userList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const addressSM = "0x92949c778531b41A9188A67473F44c5f1E9e9cf3";

    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    //Create contract for Metamask
    var contract_MM = new web3.eth.Contract(abi, addressSM);
    console.log(contract_MM);

    //Create contract for Infura
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/9994e917db1a41d58d8552c470fceb2d");
    var web3_infura = new Web3(provider);
    var contract_infura = web3_infura.eth.Contract(abi, addressSM);
    console.log(contract_infura);
    contract_infura.events.SM_emit_data({ filter: {}, fromBlock: "latest" }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            $("#tableUserList").append(`
                <tr id="row1">
                    <td>`+ data.returnValues[0] + `</td>
                    <td>`+ data.returnValues[1] + `</td>
                </tr>
        `);
        }
    });

    var currentAccount = "";


    checkMetamask();

    // detect Metamask account change
    window.ethereum.on('accountsChanged', function (accounts) {
        console.log('accountsChanges', accounts);
        currentAccount = accounts[0];
    });

    // detect Network account change
    window.ethereum.on('networkChanged', function (networkId) {
        console.log('networkChanged', networkId);
    });

    $("#btnRegister").click(function () {
        if (currentAccount.length == 0) {
            alert("Please connect Metamask!");
        } else {
            $.post("./register", {
                email: $("#txtEmail").val(),
                name: $("#txtName").val(),
                phonenumber: $("#txtPhonenumber").val()
            }, function (data) {
                // console.log(data);
                if (data.status == 1) {
                    contract_MM.methods.register(data.result._id).send({
                        from: currentAccount
                    });
                }
            });
        }
    });

    $("#btnConnectMetamask").click(function () {
        connectMetamask().then((data) => {
            currentAccount = data[0];
            console.log(currentAccount);
        }).catch((err) => {
            console.log('Connect Metamask error! - ' + err);
        });
    });

});

async function connectMetamask() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function checkMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        console.log('MetaMask is not installed!');
    }
}