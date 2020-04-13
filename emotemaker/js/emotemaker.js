function setEmotes(url) {
  if (url instanceof File) {
    url = URL.createObjectURL(url)
  }

  var img = new Image();
  img.src = url
  img.onload = function () {
    var emoteElements = $('.chat-emote.chat-emote-MyNewEmote')
    var custom_height_value = $("#custom-height-input").val()

    const new_height = (custom_height_value !== '') ? custom_height_value : 32
    const new_width = (this.width * new_height) / this.height

    for (element of emoteElements) {
      if (element === "length") { continue }
      element.style.backgroundImage = `url("${url}")`
      element.style.width = new_width + 'px'
      element.style.height = new_height + 'px'
      element.style.backgroundSize = `${new_width}px ${new_height}px`
    }
  }
}

function urlParser(url) {
  var vars = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function drop(event) {
  event.preventDefault()
  var data = event.dataTransfer.getData("text")
  setEmotes(data)
}

function dragHandler(e) {
  e.preventDefault()
  textContainer = $("#dragndrop-text-container")

  if (e.type === 'dragleave') {
    textContainer.css('border', '2px dashed grey')
  } else if (e.type === 'dragover') {
    textContainer.css('border', '2px dashed green')
  }
}


window.onload = function () {
  var parsedURL = this.urlParser(window.location.href)

  // checks if perma url exists and sets emotes if so
  if (parsedURL.image !== this.undefined) {
    this.setEmotes(parsedURL.image)
  }

  $('.input-form').submit(e => {
    e.preventDefault()
    const imgurl = $("#emote_input").val()

    this.setEmotes(imgurl)
  })

  $("#file-input-label").change("change", e => {
    this.setEmotes(e.target.files[0])
  })
}