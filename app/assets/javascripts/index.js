$(document).on("turbolinks:load", function () {

  $(document).on("click", ".user-search-add", function () {
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
    selectUserName(user_id, user_name);
    $(this).parent().remove();
  })
  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  })

  var search_list = $("#user-search-result");
  var select_list = $("#chat-group-users");

  function appendUserName(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class = "chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>`
    search_list.empty();
    search_list.append(html);
  }

  function selectUserName(user_id, user_name) {
    var remove_html = `<div class='chat-group-user'>
                        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                          <p class='chat-group-user__name'>${user_name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                     </div>`    
  
  select_list.append(remove_html);
  }

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