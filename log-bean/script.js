function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.querySelector("#name").innerHTML = profile.getName();
    document.querySelector("#email").innerHTML = profile.getEmail();
    alert('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    alert('Image URL: ' + profile.getImageUrl());
    document.querySelector(".data").style.display = "block";
    document.querySelector(".g-signin2").style.display = "none";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert('User signed out.');
        document.querySelector(".g-signin2").style.display = "block";
        document.querySelector(".data").style.display = "none";
    });
}