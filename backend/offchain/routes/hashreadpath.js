'use strict';
const fs = require('fs');

const hashGenerator = require('../utils/hash-generator');
const walk = require('../utils/walk-dir');

const express = require('express');
const router = express.Router();

const connector = require('../endpoint/mapping');

// Read FTH & MTH
router.post('/', async function (request, response, next) {
    // Verify if the file tree structure or the modified time array has changed
    // This will indicate if changes occurred
    // Then we can check with record on the ledger
    const modtime = request.body.modtime;
    const directory = request.body.DirPath;

    let jsonString;
    let timestamp = [];

    const files = await walk(directory)
    for (const file of files) {
        fs.stat(file, (err, stats) => {
            timestamp.push(stats.mtime);
        })
    }

    const FTH = await hashGenerator.stringHash(files.toString());
    const MTH = await hashGenerator.stringHash(timestamp.toString());

    const res = await connector.pathRead(modtime, FTH, MTH).catch((err) => {
        console.error(err);
    });
    jsonString = JSON.stringify({result: res, files: files})
    response.send(jsonString);
})

module.exports = router;