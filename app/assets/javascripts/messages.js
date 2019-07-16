$(function(){
  function buildHTML(messages){
    var addImage = (messages.image !== null) ? `<img class = "lower-message__image", src="${messages.image}" alt="Template 1599665  480">` : ''  

    var html = 
    `<div class="message" data-id=${messages.id}>
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
var interval = setInterval(function() {
  if (location.href.match('/groups/group_id/messages/')){
    $('.Chat_main').animate({scrollTop: $('.Chat_main')[0].scrollHeight}, 'fast');
    var last_message_id = $('.message').last().data('id');
  
  $.ajax({
    url: 'api/messages',
    type: 'GET',
    dataType: 'json',
    data: {id: last_message_id}
    })
  
  .done(function(messages) {
    messages.forEach(function(message){
    var insertHTML = buildHTML(message);
    $('.message').append(insertHTML);
    $('.Chat_main').animate({scrollTop: $('.Chat_main')[0].scrollHeight}, 'fast');
    })
  })
  .fail(function() {
      arert('error');
  });
} else {
      clearInterval(interval);
  }
  },5000);
})
