function GCD(a,b) {
  return (b == 0) ? a : GCD (b, a%b);
}



function setImage(img, img_width, img_height) {
  var emoteElements = $('.chat-emote.chat-emote-MyNewEmote')

  new_width = (img_width * 32) / img_height
  new_height = 32
  
  for (element in emoteElements) {
    emoteElements[element].style.backgroundImage = `url("${img}")`
    emoteElements[element].style.width = new_width + 'px'
    emoteElements[element].style.height = new_height + 'px'
    emoteElements[element].style.backgroundSize = `${new_width}px ${new_height}px`
  }
}




function changeEmoteImage() {
  var URL = document.getElementById('emote_input').value

  var img = new Image();
  img.src = URL;
  img.onload = function() {
    setImage(this.src, this.width, this.height)
  }
}

