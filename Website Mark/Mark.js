const year = new Date().getFullYear();
var soundOn = false;
var light = true;
document.querySelector(".headText > h2").textContent = `Mark's page`
document.querySelector(".footer > p").textContent = `© ${year} Mark's Page | Designed by Mark`

$('#a').on('input', function() {
    $('#x').text($(this).val() * 100 + '%');
    audio.volume = $(this).val();
    owlAudio.volume = $(this).val();
});

var owlAudio = new Audio('./marksources/Sounds/owl.mp3');
var audio = new Audio('./marksources/Sounds/birds.mp3');
audio.volume = 0.6;
owlAudio.volume = 0.6;

var sound = $(".sound")
sound.on("click", function(){
    if (!soundOn){
        if(light){
            sound.attr("src", "./marksources/soundOnLight.svg")
            audio.currentTime = 0;
            owlAudio.pause();
            owlAudio.currentTime = 0;
            audio.play();
        } else{
            sound.attr("src", "./marksources/soundOnDark.svg")
            audio.currentTime = 0;
            audio.pause();
            owlAudio.currentTime = 0;
            owlAudio.play();
        }
        soundOn = true;
    } else {
        if(light){
            sound.attr("src", "./marksources/soundOffLight.svg")
            audio.currentTime = 0;
            audio.pause();
            owlAudio.currentTime = 0;
            owlAudio.pause();
        }else{
            sound.attr("src", "./marksources/soundOffDark.svg")
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
        $(".fox").css("opacity", 0.7)
        $(".mode").attr("src", "./marksources/night.png")
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
            sound.attr("src", "./marksources/soundOnDark.svg")
        }else{
            sound.attr("src", "./marksources/soundOffDark.svg")
        }

    } else{
        light = true;
        $(".fox").css("opacity", 1)
        $(".mode").attr("src", "./marksources/day.png")
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
            sound.attr("src", "./marksources/soundOnLight.svg")
        } else{
            sound.attr("src", "./marksources/soundOffLight.svg")
        }

    }
})

var settings = false;
$(".cog").on("click", function(){
    if(!settings){
        $("body").css("position", "relative")
        $("body").css("left", "20%")
        $(".trees").css("position", "absolute")
        $(".trees").css("bottom", 0)
        $(".cog").addClass("spinOut")
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
        setTimeout(function(){
            $(".cog").removeClass("spinIn")
        }, 750)
        
        setTimeout(function(){
            $(".trees").css("position", "fixed")
            $(".trees").css("bottom", "6vh")
            settings = false;
        }, 750)
    }
});
