function initClient() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '607568017086-sjl3pgll8kc2mq4u09vdv9qja27lsmla.apps.googleusercontent.com'
        });
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.querySelector("#name").innerText = profile.getName();
    document.querySelector("#email").innerText = profile.getEmail();
    document.querySelector("#image").innerHTML = `<img src="${profile.getImageUrl()}" alt="Profile Image">`;
    document.querySelector(".data").style.display = "block";
    document.querySelector(".g-signin2").style.display = "none";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        alert('User signed out.');
        document.querySelector(".g-signin2").style.display = "block";
        document.querySelector(".data").style.display = "none";
    });
}
