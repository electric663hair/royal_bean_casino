document.querySelector("#copyright").innerHTML = '©' + new Date().getFullYear() + ' Edging Studios, Inc'

function signin() {
    window.alert("Login")
}

function signup() {
    window.alert("Signup")
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

    // Change color on the text of the nav buttons so that the name of the subpage you are on are in the text-secondary color
    var buttons = document.querySelectorAll('ul.nav > li > a');
    buttons.forEach(function(btn) {
        if (document.getElementById(window.location.hash.substring(1) + "Btn") == btn) {
            btn.classList.remove('text-white');
            btn.classList.add('text-secondary');
        } else {
            btn.classList.remove('text-secondary');
            btn.classList.add('text-white');
        }
    })
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

// Handle hash changes (e.g., if user manually changes it)
window.addEventListener('hashchange', function() {
    var currentHash = window.location.hash.substring(1);
    showSection(currentHash);
});

// Add this function in buttons that is going to chagne hash
function changeHashTo(section) {
    window.location.hash = section;
    showSection(section);
}