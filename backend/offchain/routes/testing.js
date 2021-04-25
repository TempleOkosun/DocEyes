
const fs = require('fs');

const hashGenerator = require('../utils/hash-generator');
const walk = require('../utils/walk-dir');



let directory = "/home/user/Pictures";
let timestamp = [];
let jsonString;

async function main(){


    const files = await walk(directory)
    for (const file of files) {
        const pathHash = await hashGenerator.stringHash(file);
        fs.stat(file, (err, stats) => {
            timestamp.push(stats.mtime);
        })
        const docHash = await hashGenerator.fileHash(file);
       // await connector.fileWrite(pathHash, docHash);
    }

    const FTH = await hashGenerator.stringHash(files.toString());

    const MTH = await hashGenerator.stringHash(timestamp.toString());

    //await connector.pathWrite(FTH, MTH);
    jsonString = JSON.stringify({files: files, MTH: MTH, FTH: FTH})
    console.log(jsonString);




}

main();