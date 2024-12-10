const year = new Date().getFullYear();
var soundOn = false;
var light = true;
var owlAudio = new Audio('./../../websites/mark/resources/Sounds/owl.mp3');
var audio = new Audio('./../../websites/mark/resources/Sounds/birds.mp3');
var sound = $(".sound")
var randomPosition;
audio.volume = 0.6;
owlAudio.volume = 0.6;
document.querySelector(".footer > p > span").textContent = `${year}`


// if (!sessionStorage.getItem("isTabOpen")) {
//     window.location.hash = "home";
// } else {
//     const daPage = localStorage.getItem("page")
//     goToPage(daPage, false)
// }

// sessionStorage.setItem("isTabOpen", "true");


// function goToPage(page, reload) {
//     if (page) window.location.hash = page;
//      localStorage.setItem("page", page)
//     if (reload){
//         $("subpage.active").fadeOut()
//     }
//     setTimeout(function(){
//         const subpages = document.querySelectorAll("subpage");
//         subpages.forEach((subpage) => {
//             subpage.classList.remove("active");
//             subpage.classList.add("notActive")
//             if (subpage.id === page) {
//                 subpage.classList.add("active");
//                 subpage.classList.remove("notActive");
//             };
//         });
//     }, 300);
//     setTimeout(function(){
//         if (reload){
//             $("subpage.active").fadeIn()
//         }
//     }, 500)
// };

// window.onhashchange = checkForHas;

for (let i = 0; i < 20; i++) {
    $("#home").append("<div class='glow none'></div>")
}

const glowBlob = $(".glow");

for (let i = 0; i < glowBlob.length; i++) {
    const randomTop = Math.random() * 100 + 3 + "%";
    const randomLeft = Math.random() * 100 + "%";
    const randomSize = Math.random() * 10 + 8;
    const randomTime = Math.random() * 5 + 4;
    const randomNum = Math.floor(Math.random()*2 + 1)
    $(glowBlob[i]).css({
        top: randomTop,
        left: randomLeft,
        zIndex: 0,
        height: randomSize + "px",
        width: randomSize + "px",
        animation: `glowPulse ${randomTime}s infinite linear, move${randomNum} ${randomTime + 5}s infinite linear`,
        opacity: (randomSize - 7)/10
    });
}


var loadMode = localStorage.getItem("mode")
if(loadMode == "dark"){
    dark();
} else{
    lightMode();
}

var setLoudness = localStorage.getItem("setLoudness")
var loudness = localStorage.getItem("sound")
if (loudness){
    audio.volume = loudness;
    owlAudio.volume = loudness;
    $("#a").val(setLoudness)
    $('#x').text(setLoudness * 100 + '%');
}


cursor = parseInt(localStorage.getItem("cursor"));
setCursor();

var cursor = 3;
$(`.cursor1`).click(function(){
    cursor = 1;
})  
$(`.cursor2`).click(function(){
    cursor = 2;
})  
$(`.cursor3`).click(function(){
    cursor = 3;
})  
$(`.cursor4`).click(function(){
    cursor = 4;
})  

function setCursor(){
    if (cursor == 1){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 5 0, auto`)
    }  else if (cursor == 2){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 10 10, auto`)
    }  else if (cursor == 3){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 9 0, auto`)
    }  else if (cursor == 4){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 12.5 12.5, auto`)
    }
}

$(".save").click(function(){
    alert("Preferences saved!")
    localStorage.setItem("cursor", cursor);
    localStorage.setItem("sound", $("#a").val())
})

$(".cursors > img").on("click", function(){
    setCursor();
})

$(".noCursor").on("click", function(){
    $("body, *").css("cursor", `auto`)
})



$('#a').on('input', function() {
    $('#x').text($(this).val() * 100 + '%');
    audio.volume = $(this).val();
    owlAudio.volume = $(this).val();
    localStorage.setItem("setLoudness", $(this).val())
});


sound.on("click", function(){
    if (!soundOn){
        if(light){
            sound.attr("src", "./../../websites/mark/resources/soundOnLight.svg")
            audio.currentTime = 0;
            owlAudio.pause();
            owlAudio.currentTime = 0;
            audio.play();
        } else{
            sound.attr("src", "./../../websites/mark/resources/soundOnDark.svg")
            audio.currentTime = 0;
            audio.pause();
            owlAudio.currentTime = 0;
            owlAudio.play();
        }
        soundOn = true;
    } else {
        if(light){
            sound.attr("src", "./../../websites/mark/resources/soundOffLight.svg")
            audio.currentTime = 0;
            audio.pause();
            owlAudio.currentTime = 0;
            owlAudio.pause();
        }else{
            sound.attr("src", "./../../websites/mark/resources/soundOffDark.svg")
            audio.currentTime = 0;
            audio.pause();
            owlAudio.currentTime = 0;
            owlAudio.pause();
        }
        soundOn = false;
    }
})

var secret1 = $(".secret1")
var branch1 = $(".branch1")
var animating = false;
branch1.on("click", function(){
    if (!animating){
        animating = true;
        if (secret1.hasClass("found1")){
            $(".secret1 h4").text("Already found!")
            $(".secret1 p").css("display", "none")
            $(".secret1 p").css("margin", 0)
        } 
        branch1.addClass("moveBranch")
        secret1.addClass("moveSecret1")
        $(".secretScore").removeClass("none")
        
        setTimeout(function(){
            branch1.removeClass("moveBranch")
            secret1.removeClass("moveSecret1")
            if(!secret1.hasClass("found1")){
                $(".star1").fadeOut(100)
                setTimeout(function(){
                    $(".star1").attr("src", "./resources/fullStar.svg")
                },100)
                $(".star1").fadeIn(100)
            }
            secret1.addClass("found1")
            animating = false;
        }, 4900)
    }
})

function dark(){
    light = false;
    localStorage.setItem("mode", "dark");
    $(".glow").removeClass("none")
    $(".glow").fadeIn()
    $(".fox").fadeOut()
    $(".owl").removeClass("none")
    $(".owl").fadeIn()
    $(".mode").attr("src", "./../../websites/mark/resources/night.png")
    $(".close").attr("src", "./../../websites/mark/resources/closeDark.svg")
    $(".mode").css("height", "5vh")
    $(".mode").css("bottom", ".5vh")
    $(".secret1").css("background-color", "#8A6A52")
    $(".mode").addClass("night")
    $(".mode").removeClass("day")
    $("body").addClass("dark")
    $("body").removeClass("light")
    audio.pause();
    audio.currentTime = 0;
    owlAudio.currentTime = 0;
    if (soundOn){
        owlAudio.play();
        sound.attr("src", "./../../websites/mark/resources/soundOnDark.svg")
    }else{
        sound.attr("src", "./../../websites/mark/resources/soundOffDark.svg")
    }
}

function lightMode(){
    light = true;
    localStorage.setItem("mode", "light");
    $(".glow").fadeOut()
    $(".owl").fadeOut();
    $(".fox").fadeIn();
    $(".mode").attr("src", "./../../websites/mark/resources/day.png")
    $(".close").attr("src", "./../../websites/mark/resources/closeLight.svg")
    $(".mode").css("height", "6vh")
    $(".mode").css("bottom", 0)
    $(".mode").addClass("day")
    $(".mode").removeClass("night")
    $(".secret1").css("background-color", "#B99470")
    $("body").addClass("light")
    $("body").removeClass("dark")
    audio.currentTime = 0;
    owlAudio.pause();
    owlAudio.currentTime = 0;
    if (soundOn){
        audio.play();
        sound.attr("src", "./../../websites/mark/resources/soundOnLight.svg")
    } else{
        sound.attr("src", "./../../websites/mark/resources/soundOffLight.svg")
    }
}

$(".mode").click(function(){
    if ($(".mode").hasClass("day")){
        dark();
    } else{
        lightMode();
    }
})

var settingsCursor = false;

function setting(){
    if(!settings){
        $("body").css("position", "relative")
        $("body").css("left", "20%")
        $(".cog").addClass("spinOut")
        $("subpage").css("bottom", "-100vh")
        settingsCursor = true;
        setTimeout(function(){
            $(".cog").removeClass("spinOut")
        }, 750)
        settings = true;
    } else{
        $("body").css("position", "fixed")
        $("body").css("width", "100vw")
        $("body").css("left", "0")
        $("body").css("right", "0")
        $(".cog").addClass("spinIn")
        settingsCursor = false;
        setTimeout(function(){
            $(".cog").removeClass("spinIn")
        }, 750)
        settings = false;
    }
}

var settings = false;
$(".cog").on("click", function(){
    setting();
});

$(".close").on("click", function(){
    setting();
});

$('.button').hover(function() {
    if($(this).children("button").hasClass("buttonNotHover") && !$(this).children("button").hasClass("animating")){
        $(this).children("button").removeClass("buttonNotHover")
    }
    $(this).children("button").addClass("buttonHover")
});

$('.button').on("mouseleave", function() {
    const button = $(this).children("button");

    if(button.hasClass("buttonHover") && !$(this).children("button").hasClass("animating")){
        button.removeClass("buttonHover")
        button.addClass("buttonNotHover")
        button.addClass("animating")
        setTimeout(function(){
            button.removeClass("animating")         
        }, 60)
    }
})

// function checkForHas() {
//     let hashVar = window.location.hash;
//     console.log(hashVar);

//     if (!hashVar)
//         goToPage("home");
//     else
//         goToPage(hashVar.slice(1));
// }
