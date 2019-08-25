$(function(){

  function buildHTML(data){
    var html = `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${data.user_name}
    </div>
    <div class="upper-message__date">
       ${data.created_at}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
       ${data.content}
    </p>
    </div>
    </div>`
    
  
    return html;
  }
  
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
    .done(function(data){
        var html = buildHTML(data);
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
    })
    
  })
  