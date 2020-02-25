const emotes_json = require('../emotes.json')

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

// $.get("https://cors-anywhere.herokuapp.com/" + args.url, function(data) {
//   document.getElementById("display").innerHTML = data
// })


function formatEmote(data) {
  emote = data.split(":")[0]
  modifier = data.split(":")[1]

  return `<span class="generify-container "><span title=" ${emote}" class="chat-emote chat-emote-${emote} chat-emote-${emote}-animate-forever>Wowee</span></span>`
}

function formatMessage() {
  // document.getElementById("display").innerText = formatEmote("Wowee")
  document.getElementById("display").innerHTML = "wowee"
}


document.getElementById("display").onloadend = formatMessage()