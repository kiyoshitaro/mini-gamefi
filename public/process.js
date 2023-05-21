$(document).ready(function () {

  $('#btnRegist').click(function () {
    alert(1);
    $.post('./v1/regist', {
      email: $("#txtEmail").val(),
      name: $("#txtName").val(),
    }, function (data) {
      console.log(data);
    })
  })
})