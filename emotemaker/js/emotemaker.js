function setEmotes(url, custom_height) {
  if (url instanceof File) {
    url = URL.createObjectURL(url)
  }

  var img = new Image();
  img.src = url
  img.onload = function () {
    var emoteElements = $('.chat-emote.chat-emote-MyNewEmote')
    
    if (!custom_height) {
        custom_height = $("#custom-height-input").val()
    }

    var new_height = (custom_height !== '') ? custom_height : 32
    var new_width = (this.width * new_height) / this.height

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

function permalinkGen(url, height, withHost) {
    if (withHost) {
        return  window.location.host + window.location.pathname + `?image=${url}` + `&customHeight=${height}`
    } else {
        return  window.location.pathname + `?image=${url}` + `&customHeight=${height}`
    }
}

window.onload = function () {
  var parsedURL = this.urlParser(window.location.href)

  // checks if perma url exists and sets emotes if so
  if (parsedURL.image !== this.undefined) {
    this.setEmotes(parsedURL.image, parseInt(parsedURL.customHeight))
  }

  $('.input-form').submit(e => {
    e.preventDefault()
    const imgurl = $("#emote_input").val()
    const heightForm = $("#custom-height-input").val()
    
    window.history.replaceState("", "", permalinkGen(imgurl, (heightForm) ? heightForm : "32"), false)
      
    this.setEmotes(imgurl)
  })

  $("#file-input-label").change("change", e => {
    this.setEmotes(e.target.files[0])
  })
}