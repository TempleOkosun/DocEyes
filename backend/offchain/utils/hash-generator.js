const fs = require('fs');
const crypto = require('crypto');

async function createHashFromString(inputString) {
    const hash = crypto.createHash('sha256').update(inputString);
    return (hash.digest('hex'));
}

async function createHashFromFile (filePath){
    return new Promise(resolve => {
        const hash = crypto.createHash('sha256');
        const readStream = fs.createReadStream(filePath);
        readStream.on('data', data => hash.update(data));
        readStream.on('end', () => resolve(hash.digest('hex')));
    })}


module.exports = {
    stringHash: createHashFromString,
    fileHash: createHashFromFile
}