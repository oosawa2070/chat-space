$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img  = message.image ? `<img class="lower-message__image" src="${ message.image }">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.date}
                    </p>
                  </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                          ${content}
                      </p>
                          ${img}
                    </div>
                </div>`
  return html;
  }
  
  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      console.log("jidoukoushin")    
    var href = 'api/messages#index {:format=>"json"}'             
    var last_message_id = $('.message:last').data('message-id');   

   
    $.ajax({
      url:  href,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })


    .done(function(messages){      
      var insertHTML='';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
    })
    .fail(function(){
      alert("自動更新に失敗しました")
    });
  };
};
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
        var html = buildHTML(message);
        $('.messages').append(html);
        $('#message_content').val('');
        $('.form__submit').attr('disabled', false);
        $('html,body').animate({
          scrollTop:$('html,body')[0].scrollHeight
        }, 'fast');
      })
      .fail(function(){
        alert('error');
      })
  
      
    setInterval(reloadMessages, 5000);
  });
});