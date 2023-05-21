$(document).ready(function () {
  let currAcc = "";
  checkMetaMask();
  $('#btnRegist').click(function () {
    alert(1);
    $.post('./v1/regist', {
      email: $("#txtEmail").val(),
      name: $("#txtName").val(),
    }, function (data) {
      console.log(data);
    })
  });

  $('#connectMM').click(function () {
    connectMetaMask().then((data) => {
      currAcc = data[0];
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