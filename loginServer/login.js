import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

import { dirname } from "path";
import { fileURLToPath } from "url";
import { stringify } from "querystring";
const __dirname = dirname(fileURLToPath(import.meta.url));

//==========

app.post("/auth", (req, res) => {

    const directoryPath = `./users/`;

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan for other Users:\n' + err);
        }
        const username = req.body["username"]
        const filePath = `./users/${username}.txt`;

        console.log(`username: ${username}\nfileName: ${filePath}`)

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error("Failed to check for username file, error:\n" + err)
                res.redirect("/");
            } else {

                const username = req.body["username"];
                const password = req.body["password"];
                //console.log(`Username:  ${username}\nPassword: ${password}`);
                res.send(`<h1>Hi ${username}!</h1>`);
            
                fs.readFile(`./users/${username}.txt`, 'utf8', (err, data) => {
                    if (err) throw err;
            
                    //console.log(data); //consoles the data in the {username}.txt file.
                    const lines = data.split('\r\n');
                    const rUsername = lines[0];
                    const rPassword = lines[1];
            
                    //console.log(`Actual username: ${rUsername}\nActual password: ${rPassword}`);
                    //console.log(`Inputted username: ${username}\nInputted password: ${password}`);
            
                    var logInError = false;
                    if (username !== rUsername) {
                        console.log("Username Error 504")
                        logInError = true;
                    }
                    if (password !== rPassword) {
                        console.log("Password Error 504")
                        logInError = true;
                    }
                    if (!logInError) {
                        console.log("Login Complete!")
                    } else {
                        console.log("=====!!!=====\nError during login!\n=====!!!=====")
                    }
                });
            }
        });
    });

});

app.post("/reg", (req, res) => {
    const directoryPath = './';

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan for other Users:\n' + err);
        }

        const cUsername = req.body["cUsername"]
        const filePath = `./users/${cUsername}.txt`;

        console.log(`cUsername: ${cUsername}\nfileName: ${filePath}`)

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                const cPassword = req.body["cPassword"];
                const cPassword2 = req.body["cPassword2"]
                if (cPassword === cPassword2) {

                    fs.writeFile(`./users/${cUsername}.txt`, `${cUsername}\n${cPassword}`, 'utf8', (err) => {if(err)throw err;})
                    console.log("User saved!")
                    res.send(`<h1>User saved as ${cUsername}!</h1>`)

                } else {
                    console.log("Passwords does not match!")
                    res.send(`<h1>Passwords does not match!</h1>`)
                }

            } else {
                console.log("Username taken!")
                res.send(`<h1>Username "${cUsername}" is already taken!</h1>`)
            }
        })
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});