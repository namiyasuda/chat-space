$(function(){
  function buildHTML(messages){
    var addImage = (messages.image !== null) ? `<img class = "lower-message__image", src="${messages.image}">` : ''  
    var html = 
    `<div class="message" data-message-id=${messages.id}>
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${messages.user_name}
    </div>
    <div class="upper-message__date">
    ${messages.created_at}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
    ${messages.content}
    </p>
    <div class="lower-message">
    ${addImage}
    
    </div>
    </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.Chat_main').append(html)
    $('.new_message')[0].reset();
    $('.Form__btn').prop('disabled', false);
    $('.Chat_main').animate({ scrollTop: $('.Chat_main')[0].scrollHeight}, 'fast');
    // return false
  })
  .fail(function(){
     alert('エラー');
  })
});
var reloadMessages = function () {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data('message-id');
  $.ajax({
    url: 'api/messages',
    type: 'GET',
    dataType: 'json',
    data:  {last_id: last_message_id}
    })
  
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function(message){
    insertHTML = buildHTML(message);
    $('.message').append(insertHTML);
  })
    $('.message').animate({scrollTop: $('.Chat_main')[0].scrollHeight}, 'fast');
    })

  .fail(function() {
      alert('error');
  });
 } 
};

setInterval(reloadMessages, 5000);

});
