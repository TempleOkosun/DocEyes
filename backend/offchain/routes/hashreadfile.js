'use strict';

const express = require('express');
const router = express.Router();

const hashGenerator = require('../utils/hash-generator');
const connector = require('../endpoint/mapping');


router.post('/', async function (request, response, next) {
    const files = request.body.files;

    const responseObject = [];
    let jsonString;

    for (const file of files) {
        const pathHash = await hashGenerator.stringHash(file);
        const docHash = await hashGenerator.fileHash(file);

        const res = await connector.fileRead(pathHash, docHash);
        responseObject.push({file: file, status: res});

        if(responseObject.length === files.length){
            jsonString = JSON.stringify({res: responseObject});
            response.send(jsonString);
        }

    }
})

module.exports = router;