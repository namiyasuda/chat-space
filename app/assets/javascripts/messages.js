$(function(){
  function buildHTML(messages){
    var addImage = (messages.image !== null) ? `<img class = "lower-message__image", src="${messages.image}" alt="Template 1599665  480">` : ''  

    var html = 
    `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${messages.name}
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
    $('.input_box__text').val('')
    $('.Form__btn').prop('disabled', false);
    $('.Chat_main').animate({ scrollTop: $('.Chat_main')[0].scrollHeight}, 'fast');
    // return false
  })
  .fail(function(){
     alert('エラー');
  })
});
})