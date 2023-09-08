function setEmotes(url) {
    if (url instanceof File) {
        url = URL.createObjectURL(url)
    }

    const newspaperTiming = {
        duration: 2000,
        iterations: 1,
    };

    var img = new Image();
    img.src = url
    img.onload = function () {
        var emoteElements = $('.chat-emote.chat-emote-MyNewEmote')

        var isAnimated = $("#animated-check-input").is(":checked")
        var animFrames = $("#anim-frames-input").val()
        var animDuration = $("#anim-duration-input").val()
        var animIterations = $("#anim-iterations-input").val()

        var custom_height_input = $("#custom-height-input").val()

        var new_height = (custom_height_input !== '') ? custom_height_input : 32
        if (!isAnimated) {
            var new_width = (this.width * new_height) / this.height
        } else {
            var new_width = this.width / animFrames
        }

        const animKeyframes = [
            { backgroundPositionX: '0px' },
            { backgroundPositionX: `-${this.width}px`},
        ];

        const animOptions = {
            duration: Number(animDuration),
            iterations: animIterations,
            easing: `steps(${animFrames})`
        };

        if (isAnimated == true) {
            for (element of emoteElements) {
                element.animate(animKeyframes, animOptions)
            }
        }

        for (element of emoteElements) {
            if (element === "length") { continue }
            element.style.backgroundImage = `url("${url}")`
            element.style.width = new_width + 'px'
            element.style.height = new_height + 'px'
            if (isAnimated != true) {
                element.style.backgroundSize = `${new_width}px ${new_height}px`
            } else {
                element.style.backgroundSize = `${this.width}px ${this.height}px`
            }
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
        return window.location.host + window.location.pathname + `?image=${url}` + `&customHeight=${height}`
    } else {
        return window.location.pathname + `?image=${url}` + `&customHeight=${height}`
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