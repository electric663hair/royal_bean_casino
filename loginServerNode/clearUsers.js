import fs from "fs";

const dirPath = './users/'

function removeFolderContents(dir) {
    fs.rmSync(dir, { recursive: true, force: true });

    fs.mkdir(dirPath, {recursive: true, force: true}, (err) => {if(err)throw err})
  }

removeFolderContents(dirPath);