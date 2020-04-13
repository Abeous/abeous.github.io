
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
}

function formatMessage(line) {
  username = line.split('|')[1].split(':')[0].trim()
  line_message = line.substring(line.indexOf(username) + username.length + 2)
  var timestamp = line.split('|')[0].trimStart()

  return `<div class="msg-chat msg-user msg-highlight"><div class="timestamp">${timestamp}</div><a class="user ">${username}</a><span class="ctrl">: </span> <span class="text">${line_message}</span></div>`
}

function displayDefault() {
    $("#chat_display").html(`<div class="msg-chat msg-user msg-highlight"><div class="timestamp">1h 7m ago   </div><a class="user ">user1</a><span class="ctrl">: </span> <span class="text">i love you testuser</span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">1h 6m ago   </div><a class="user ">user2</a><span class="ctrl">: </span> <span class="text">hey im mentioning you testuser</span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">1h 6m ago   </div><a class="user ">user3</a><span class="ctrl">: </span> <span class="text">testuser <span class="generify-container generify-emote-SPY "> <span title=" SPY" class="chat-emote chat-emote-SPY chat-emote-SPY-animate-forever"> SPY </span></span> im mentioning you with an emote</span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">1h 5m ago   </div><a class="user ">user4</a><span class="ctrl">: </span> <span class="text">testuser sup cool guy <span class="generify-container generify-emote-EZ "> <span title=" EZ" class="chat-emote chat-emote-EZ chat-emote-EZ-animate-forever"> EZ </span></span></span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">55m 53s ago </div><a class="user ">user5</a><span class="ctrl">: </span> <span class="text">testuser testuser2 you guys wanna game?</span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">29m 13s ago </div><a class="user ">user6</a><span class="ctrl">: </span> <span class="text">testuser ttyl my guy</span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">26m 36s ago </div><a class="user ">user7</a><span class="ctrl">: </span> <span class="text">testuser <span class="generify-container generify-emote-billyWeird "> <span title=" billyWeird" class="chat-emote chat-emote-billyWeird chat-emote-billyWeird-animate-forever"> billyWeird </span></span></span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">25m 4s ago  </div><a class="user ">user8</a><span class="ctrl">: </span> <span class="text">testuser testuser2 you playing cod or no?</span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">14m 30s ago </div><a class="user ">user9</a><span class="ctrl">: </span> <span class="text">testuser testuser testuser testuser </span></div><div class="msg-chat msg-user msg-highlight"><div class="timestamp">13m 57s ago </div><a class="user ">user10</a><span class="ctrl">: </span> <span class="text">testuser pull requests welcome</span></div>`)
}

function setDisplay(args) {
  $.get("https://yacdn.org/serve/" + args.url, function(data) {
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
  var urlargs = this.getUrlVars()
  if (urlargs.url !== this.undefined){
    this.setDisplay(urlargs)
  } else {
    this.displayDefault()
  }
}