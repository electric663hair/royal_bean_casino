<<<<<<< Updated upstream
const year = new Date().getFullYear();
document.querySelector(".headText > h2").textContent = `Terry's page`
document.querySelector(".footer > p").textContent = `© ${year} Terry's Page | Designed by Terry`
=======
var audio = new Audio('./marksources/Sounds/birds.mp3');
var sound = $(".sound")
sound.on("click", function(){
    if (sound.hasClass("soundOff")){
        audio.play();
        sound.attr("src", "./marksources/soundOn.svg")
        sound.addClass("soundOn")
        sound.removeClass("soundOff")
    } else {
        audio.pause();
        audio.currentTime = 0;
        sound.attr("src", "./marksources/soundOff.svg")
        sound.removeClass("soundOn")
        sound.addClass("soundOff")
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
    }, 8000)
})
>>>>>>> Stashed changes
