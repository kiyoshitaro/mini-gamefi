$(document).ready(function () {
  checkMetaMask();

  const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_id",
          "type": "string"
        }
      ],
      "name": "pushData",
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
      "name": "regist",
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
      "name": "arrUser",
      "outputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_wallet",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const addressSMC = "0x15D06ba32AF455F31D5A401bA653bc3196C5d2e9";
  const web3 = new Web3(window.ethereum);
  window.ethereum.enable();
  let contractMetamask = new web3.eth.Contract(abi, addressSMC);
  console.log("🚀 ~ file: process.js:8 ~ contractMetamask:", contractMetamask)

  let currAcc;
  $('#btnRegist').click(function () {
    if (!currAcc) {
      alert("You are not connect wallet!")
    } else {
      $.post('/v1/regist', {
        email: $("#txtEmail").val(),
        name: $("#txtName").val(),
      }, function (data) {
        console.log(data);
        if (data.status === 200) {
          contractMetamask.methods.regist(data.data._id).send({ from: currAcc });
        }
      })
    }
  });

  $('#connectMM').click(function () {
    connectMetaMask().then((data) => {
      currAcc = data[0];
      console.log("🚀 ~ file: process.js:88 ~ connectMetaMask ~ currAcc:", currAcc)
    }).catch((err) => {
      console.log(err);
    });
  });
})

function checkMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
}
async function connectMetaMask() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  return accounts;
}