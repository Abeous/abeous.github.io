function setEmotes(url) {
  var img = new Image();
  img.src = url
  img.onload = function () {
    var emoteElements = $('.chat-emote.chat-emote-MyNewEmote')
    var custom_height_value = $("#custom-height-input").val()

    var new_height;
    if (custom_height_value !== ''){
      new_height = custom_height_value
    } else {
      new_height = 32
    }
    
    new_width = (this.width * new_height) / this.height

    for (element in emoteElements) {
      emoteElements[element].style.backgroundImage = `url("${url}")`
      emoteElements[element].style.width = new_width + 'px'
      emoteElements[element].style.height = new_height + 'px'
      emoteElements[element].style.backgroundSize = `${new_width}px ${new_height}px`
    }
  }
}


function drop(event) {
  event.preventDefault()
  var data = event.dataTransfer.getData("text")
  setEmotes(data)
}


window.onload = function () {
  $('#emote-submit-button').click(() => {
    this.setEmotes($("#emote_input").val())
  })
}