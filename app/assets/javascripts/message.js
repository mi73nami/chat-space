$(function(){
  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class = "message">
                    <div class = "message__user">
                      <p class = "message__user__name">${message.user_name}</p>
                      <p class = "message__user__time">${message.created_at}</p>
                    </div>
                    <div class = "message__content">
                        ${message.content}
                      <img class = "content__image" src = ${message.image} >
                    </div>
                  </div>`
    } else if (message.content) {
        var html = `<div class = "message">
                    <div class = "message__user">
                      <p class = "message__user__name">${message.user_name}</p>
                      <p class = "message__user__time">${message.created_at}</p>
                    </div>
                    <div class = "message__content">
                      ${message.content}
                    </div>
                  </div>`
    } else if (message.image) {
        var html = `<div class = "message">
                      <div class = "message__user">
                        <p class = "message__user__name">${message.user_name}</p>
                        <p class = "message__user__time">${message.created_at}</p>
                      </div>
                      <div class = "message__content">
                        <img class = "content__image" src = ${message.image} >
                      </div>
                    </div>`
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
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
    .done(function (data) {
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('form')[0].reset();
      $(".send-btn").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});