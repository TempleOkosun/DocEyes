const moment = require('moment');
const fabric = require('../utils/fabric-connector');

// Write file hash to blockchain- takes dir path hash and document hash as inputs.
async function bWrite(pHash,dHash) {
    const contract = await fabric.connect();
    try {
        await contract.submitTransaction('addDocHash', pHash, dHash);
    } catch (error) {
        console.error('Failed to submit transaction: ', error);
        const msg = {error: error.message};
        return JSON.stringify(msg);
    } finally {
        await fabric.disconnect();
    }
    return JSON.stringify({result:"Transaction submitted successfully"});
}

// Writes the last modified time hash mth & file tree hash fth to the blockchain using current time as key
async function pWrite(FTH,MTH) {
    const contract = await fabric.connect();
    const dateTime = moment().unix().toString();
    try {
        await contract.submitTransaction('addPathHash', dateTime, MTH, FTH);
    } catch (error) {
        console.error('Failed to submit transaction: ', error);
        const msg = {error: error.message};
        return JSON.stringify(msg);
    } finally {
        await fabric.disconnect();
    }
    console.log(dateTime);
    return JSON.stringify({timestamp: dateTime});
}


// Read mth & fth from blockchain
async function pRead(dateTime, ModTH, FileTH) {
    const contract = await fabric.connect();
    let result;
    try {
        result = await contract.evaluateTransaction('queryPathHash', dateTime);
    } catch (error) {
        console.error('Failed to submit transaction: ', error);
        return JSON.stringify({error: error.message});
    } finally {
        await fabric.disconnect();
    }
    console.log('result from chaincode = ' + result.toString());
    const resultObject = JSON.parse(result.toString());
    console.log('result from blockchain: ' + resultObject);
    let status;
    if(resultObject["MTimeHash"] !== ModTH || resultObject["TreeHash"] !== FileTH){
        console.log("File tampered");
        status = 'Tampered'
    } else{
        console.log("File not tampered");
        status = 'Not Tampered'
    }
    return status;
}


// Compare the current hash of a file with hash recorded on blockchain
async function bRead(pathHash, docHash) {
    const contract = await fabric.connect();
    let result;
    try {
        result = await contract.evaluateTransaction('queryDocHash', pathHash);
    } catch (error) {
        console.error('Failed to submit transaction: ', error);
        return JSON.stringify({error: error.message});
    } finally {
        await fabric.disconnect();
    }
    console.log('result from chaincode: ' + result.toString());
    const resultObject = JSON.parse(result.toString());
    console.log('result from blockchain: ' + resultObject);
    let status;
    if(resultObject["DocHash"] !== docHash){
        console.log("File tampered");
        status = 'Tampered'
    } else {
        console.log("File not tampered");
        status = 'Not Tampered'
    }
    return status;
}

module.exports = {
    fileWrite:bWrite,
    pathWrite:pWrite,
    pathRead:pRead,
    fileRead:bRead
}
