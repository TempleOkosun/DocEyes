'use strict';

const express = require('express');
const router = express.Router();

const fs = require('fs');
const hashGenerator = require('../utils/hash-generator');
const walk = require('../utils/walk-dir');

const connector = require('../endpoint/mapping');

// calculates hash of each file, last mth of all files, hash of file tree & store to ledger
router.post('/', async function (request, response, next) {
    let directory = request.body.DirPath;
    let timestamp = [];
    let jsonString;

    const files = await walk(directory)
    for (const file of files) {
        const pathHash = await hashGenerator.stringHash(file);
        fs.stat(file, (err, stats) => {
            timestamp.push(stats.mtime);
        })
        const docHash = await hashGenerator.fileHash(file);
        await connector.fileWrite(pathHash, docHash);
    }

    const FTH = await hashGenerator.stringHash(files.toString());
    const MTH = await hashGenerator.stringHash(timestamp.toString());

    await connector.pathWrite(FTH, MTH);
    jsonString = JSON.stringify({files: files, MTH: MTH, FTH: FTH})
    response.send(jsonString);
    }
)

module.exports = router;