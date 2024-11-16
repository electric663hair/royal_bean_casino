const year = new Date().getFullYear();
var light = true;
var soundOn = false;
document.querySelector(".headText > h2").textContent = `Mark's page`
document.querySelector(".footer > p").textContent = `© ${year} Mark's Page | Designed by Mark`

var audio = new Audio('./marksources/Sounds/birds.mp3');
var sound = $(".sound")
sound.on("click", function(){
    if (!soundOn){
        audio.play();
        if(light){
            sound.attr("src", "./marksources/soundOnLight.svg")
        } else{
            sound.attr("src", "./marksources/soundOnDark.svg")
        }
        soundOn = true;
    } else {
        audio.pause();
        audio.currentTime = 0;
        if(light){
            sound.attr("src", "./marksources/soundOffLight.svg")
        }else{
            sound.attr("src", "./marksources/soundOffDark.svg")
        }
        soundOn = false;
    }
})

var secret1 = $(".secret1")
var branch1 = $(".branch1")
branch1.on("click", function(){
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
    }, 5000)
})

var owlAudio = new Audio('./marksources/Sounds/owl.mp3');
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
