/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// This script will be used by peer chaincode install & peer chaincode instantiate tools
// To deploy chaincode to the blockchain

const DocEyesContract = require('./lib/doc-eyes-contract');

module.exports.DocEyesContract = DocEyesContract;
module.exports.contracts = [ DocEyesContract ];



