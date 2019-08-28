$("#group_users").on("keyup", function () {
  var input = $("#group_users").val();
  $.ajax({
      type: 'GET',
      url: '/users',
      data: {
        keyword: input
      },
      dataType: 'json'
    })
    .done(function (users) {
      if (users.length !== 0) {
        users.forEach(function (user) {
          appendUserName(user);
        });
      }
    })
    .fail(function () {
      alert('error');
    })
});
});