setInterval(Update, 50);
function Update() {
    if (clicks != null && recordClicks != null) {
        document.querySelector("#currentCps").innerHTML = clicks;
        document.querySelector("#recordCps").innerHTML = recordClicks;
    }
}

var loggedIn = false;

function login() {
    loggedIn = !loggedIn;
    console.log("Logged in = " + loggedIn)

    if (loggedIn) {
        document.querySelector("#loginBtn h1").textContent = "Log Out";
    } else if (!loggedIn) {
        document.querySelector("#loginBtn h1").textContent = "Log In";
    }
}

clicks = 0;
recordClicks = 0;
function cpsTestClick() {
    clicks++;
    setTimeout(removeClick, 1000)
    if (clicks > recordClicks) {
        recordClicks = clicks;
        timeOfCpsRecord = Date();
        dateOfCpsRecord = new Date();
    }
}

function removeClick() {
    clicks--;
}


//Page Changin Buttons

function navigateTo(section) {
    window.location.hash = section;  // Update the URL hash
    showSection(section);  // Show the corresponding section
}

function showSection(section) {
    // Hide all sections
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(sec) {
        sec.classList.remove('active');
    });

    // Show the selected section
    var activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Handle page load with hash
window.addEventListener('load', function() {
    var currentHash = window.location.hash.substring(1); // Remove the '#' from the hash
    if (currentHash) {
        showSection(currentHash);
    } else {
        showSection('home');  // Default to home section if no hash
    }
});

//Manual Hash changing
window.addEventListener('hashchange', function() {
    var currentHash = window.location.hash.substring(1);
    showSection(currentHash);
});

//End Page Changing Buttons