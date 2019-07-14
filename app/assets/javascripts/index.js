$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendProduct(user) {
    var html = 
    `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`
    search_list.append(html)
    }
  
  function appendErrMsgToHTML(msg) {
    var html = 
    `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ msg }</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="" data-user-name="}"></div>
  </div>`
    search_list.append(html);
  }

  function appendUser(id,name) {
    var html =
    `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value='${ id }'>
    <p class='chat-group-user__name'>${ name }</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`
    member_list.append(html);
  }

  $(".chat-group-form__input").on("keyup", function(e) {
    var input = $("#user-search-field").val();
    $("#user-search-result").empty();
    if (input !== '') {

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      if (users.length !== 0){
        users.forEach(function(user){
          appendProduct(user);
         });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはありません");
      }
    })
  }
  });

  $(document).on("click",'.user-search-add', function () {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    appendUser(id,name)
    $("#user-search-result").empty();
  });
  $(document).on("click",'.user-search-remove', function () {
    $("#chat-group-users").empty();
  });
  

})