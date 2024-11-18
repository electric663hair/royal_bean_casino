const year = new Date().getFullYear();
var soundOn = false;
var light = true;
document.querySelector(".footer > p > span").textContent = `${year}`

// const cursor = document.querySelector(".cursor");
// const settingsOffset = window.innerWidth/5
// document.addEventListener("mousemove", e => {
//     if (settingsCursor){
//         cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10 - settingsOffset) + "px")
//     } else{
//         cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px")
//     }
 
// })
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


$(".cursors > img").on("click", function(){
    if (cursor == 1){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 5 0, auto`)
    }  else if (cursor == 2){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 10 10, auto`)
    }  else if (cursor == 3){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 9 0, auto`)
    }  else if (cursor == 4){
        $("body, *").css("cursor", `url(./resources/cursor${cursor}.svg) 12.5 12.5, auto`)
    }


})

$(".noCursor").on("click", function(){
    $("body, *").css("cursor", `auto`)
})



$('#a').on('input', function() {
    $('#x').text($(this).val() * 100 + '%');
    audio.volume = $(this).val();
    owlAudio.volume = $(this).val();
});

var owlAudio = new Audio('./../../websites/mark/resources/Sounds/owl.mp3');
var audio = new Audio('./../../websites/mark/resources/Sounds/birds.mp3');
audio.volume = 0.6;
owlAudio.volume = 0.6;

var sound = $(".sound")
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
        if (secret1.hasClass("found")){
            $(".secret1 h4").text("Already found!")
            $(".secret1 p").css("display", "none")
            $(".secret1 p").css("margin", 0)
        } 
        branch1.addClass("moveBranch")
        secret1.addClass("moveSecret1")
    
        setTimeout(function(){
            branch1.removeClass("moveBranch")
            secret1.removeClass("moveSecret1")
            secret1.addClass("found")
            animating = false;
        }, 5000)
    }
})

$(".mode").click(function(){
    if ($(".mode").hasClass("day")){
        light = false;
        $(".fox").fadeOut()
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

    } else{
        light = true;
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
})

var settingsCursor = false;

function setting(){
    if(!settings){
        $("body").css("position", "relative")
        $("body").css("left", "20%")
        $(".fox").css("bottom", "-2vh")
        $(".trees").css("position", "absolute")
        $(".trees").css("bottom", 0)
        $(".cog").addClass("spinOut")
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
        
        setTimeout(function(){
            $(".trees").css("position", "fixed")
            $(".trees").css("bottom", "6vh")
            settings = false;
        }, 750)
    }
}

var settings = false;
$(".cog").on("click", function(){
    setting();
});

$(".close").on("click", function(){
    setting();
});
