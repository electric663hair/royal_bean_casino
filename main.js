const dBody = document.body;
const backButton = document.createElement("a");
backButton.classList.add("backButton")
backButton.innerText = "Tilbake";
backButton.href = "..\\#play";
dBody.insertBefore(backButton, dBody.firstChild);