
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

const GENERIFY_OPTIONS = {
  'mirror': 'mirror',
  'flip': 'flip',
  'rain': 'weather rain anim-fix',
  'snow': 'weather snow anim-fix',
  'rustle': 'generify-rustle',
  'worth': 'generify-worth',
  // 'dank': 'generify-dank',
  'hyper': 'generify-hyper generify-rustle',
  'love': 'generify-love',
  'spin': 'generify-spin',
  'wide' : 'wide',
  'virus' : 'virus',
  'banned' : 'banned',
  // 'frozen': 'frozen',
  'lag' : 'lag',
};

function formatEmote(data) {
  emote = data.split(":")[0]
  modifier = data.split(":")[1]
  
  return `<span class="generify-container generify-emote-${emote}"><span title=" ${emote}" class="chat-emote chat-emote-${emote} chat-emote-${emote}-animate-forever></span></span>`
}

function formatMessage(line, message) {
  username = line.split('|')[1].split(':')[0]
  line_message = line.substring(line.indexOf(username) + username.length)

  return `<div class="msg-chat msg-user msg-highlight"><a class="user ">${username}</a><span class="ctrl">: </span> <span class="text">${line_message}</span></div>`
}

function setDisplay() {
  args = getUrlVars()
  $.get("https://cors-anywhere.herokuapp.com/" + args.url, function(data) {
    lines = data.split('\r\n')
    $.getJSON("./emotes.json", function(json) {
      emotesArray = Object.values(json.default)
      regex = new RegExp(`(^|\\s)(${emotesArray.join('|')})(:(${Object.keys(GENERIFY_OPTIONS).join('|')}))?(?=$|\\s)`, 'gm')
      var formatted_lines = []
      for (line in lines) {
        for (emote in emotesArray) {
          (lines[line].includes(emotesArray[emote]))
          ? formatted_lines[line] = lines[line].replace(regex, formatEmote(emotesArray[emote]))
          : formatted_lines[line] = lines[line]
        }
      }

      for (line in formatted_lines) {
        var newLine = formatMessage(lines[line])
        console.error(formatted_lines[line])
        document.getElementById("chat_display").insertAdjacentHTML('beforeend', newLine)
      }
    })
  })
}



window.onload = function() {
  this.setDisplay()
}