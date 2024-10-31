function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.querySelector("#name").innerHTML = profile.getName();
    document.querySelector("#email").innerHTML = profile.getEmail();
    alert('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    alert('Image URL: ' + profile.getImageUrl());
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}