document.querySelector("#copyright").innerHTML = "©" + new Date().getFullYear() + " Royal Bean Studios, Inc";

function pageOpened() {
    var hash = window.location.hash;
    if (hash === "" || hash === "#") {
        window.location.hash = "home";
    }
}

function showSection(section) {
    // Hide all sections
    var sections = document.querySelectorAll(".section");
    sections.forEach(function(sec) {
        sec.classList.remove("active");
    });

    // Show the selected section
    var activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.classList.add("active");
    }

    // Change color on the text of the nav buttons so that the name of the subpage you are on are in the text-warning color
    var buttons = document.querySelectorAll("ul.nav > li > button.nav-link");
    buttons.forEach(function(btn) {
        if (document.getElementById(window.location.hash.substring(1) + "Btn") == btn || document.getElementById(window.location.hash.substring(1) + "BtnFooter") == btn) {
            btn.classList.remove("text-white");
            btn.classList.add("text-warning");
        } else {
            btn.classList.remove("text-warning");
            btn.classList.add("text-white");
        }
        window.scrollTo(0, 0);
    })
}

// Handle page load with hash
window.addEventListener("load", function() {
    var currentHash = window.location.hash.substring(1); // Remove the "#" from the hash
    if (currentHash) {
        showSection(currentHash);
    } else {
        window.location.hash = "#home";
        showSection("home");  // Default to home section if no hash
    }
});

// Handle hash changes (e.g., if user manually changes it)
window.addEventListener("hashchange", function() {
    var currentHash = window.location.hash.substring(1);
    showSection(currentHash);
});

// Add this function in buttons that is going to change hash
function changeHashTo(section) {
    window.location.hash = section;
    showSection(section);
}


// =====External HTML Files

// $(function(){
//     $("#termsOfService").load("termsOfService.html"); 
//   });

function showPrompt() {
    document.getElementById('customPrompt').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function submitPassword() {
    const answer = document.getElementById('password').value;
    if (answer === "Enigma$") {
        console.log("Success!")
        document.querySelector("header").style.display = "block";
        document.querySelector("footer").style.display = "block";
        closePrompt();
    } else {
        document.getElementById("errorTextPassword").innerText = "Incorrect password! Try again";
    }

    document.getElementById('password').value = '';
}

function closePrompt() {
    document.getElementById('customPrompt').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }