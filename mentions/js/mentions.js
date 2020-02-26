
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

function formatEmote(m) {
  const input = m.split(':')
  const emote = input[0].replace(/\s/g, '');
  var suffix = "";
  if (input.length > 1) {
      suffix = input[1].replace(/\s/g, '');
  }

  const innerClasses = ['chat-emote', 'chat-emote-'+emote];
  
  const generifyClasses = [
    'generify-container',
    'generify-emote-' + emote,
    GENERIFY_OPTIONS[suffix] || "",
  ];
  
  innerClasses.push('chat-emote-'+emote+'-animate-forever')
  
  const innerEmote = ' <span ' + ' title="' + m + '" class="' + innerClasses.join(' ') + '">' + m + ' </span>';
  return ' <span class="' + generifyClasses.join(' ') + '">' + innerEmote + '</span>';
  // return ` <span class="generify-container generify-emote-${emote}"><span title=" ${emote}" class="chat-emote chat-emote-${emote} chat-emote-${emote}-animate-forever"> ${emote} </span></span>`
}

function formatMessage(line) {
  username = line.split('|')[1].split(':')[0]
  line_message = line.substring(line.indexOf(username) + username.length + 2)

  return `<div class="msg-chat msg-user msg-highlight"><a class="user ">${username}</a><span class="ctrl">: </span> <span class="text">${line_message}</span></div>`
}

function setDisplay() {
  args = getUrlVars()
  $.get("https://cors-anywhere.herokuapp.com/" + args.url, function(data) {
    lines = data.split('\r\n')
    $.getJSON("./emotes.json", function(json) {
      emotesArray = Object.values(json.default)
      const emoticons = emotesArray.join('|')
      const suffixes = Object.keys(GENERIFY_OPTIONS).join('|')
      regex = new RegExp(`(^|\\s)(${emoticons})(:(${suffixes}))?(?=$|\\s)`, 'gm')

      for (line in lines) {
        formatted_line = formatMessage(lines[line].replace(regex, formatEmote))
        document.getElementById("chat_display").insertAdjacentHTML('beforeend', formatted_line)
      }
    })
  })
}


// test
window.onload = function() {
  this.setDisplay()
}