/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const {Contract} = require('fabric-contract-api');

class DocEyesContract extends Contract {

    // Helper Functions
    // Helper function-1 to check if a record exists in the ledger.
    async RecordExists(ctx, input) {
        const buffer = await ctx.stub.getState(input);
        return (!!buffer && buffer.length > 0);
    }

    // Helper function-2 to retrieve records corresponding to a query string.
    async QueryLedger(ctx, docType, index){
        let queryString = {
            "selector": {
                "docType": docType,
                index: index
            }
        };

        let record;
        for await (const {value} of ctx.stub.getQueryResult(JSON.stringify(queryString))) {
            const strValue = Buffer.from(value).toString('utf8');
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
            }
        }
        console.info(record);
        return record;
    }


    // store the hash of documents in a secured folder on the ledger using the pathHash as key.
    async addDocHash(ctx, PathHash, DocHash) {
        console.info('========== START : Register Document Hash ==========');
        // define a document, provide its hash & path hash
        const document = {
            DocHash,
            index: PathHash,
            docType: 'document'
        };
        await ctx.stub.putState(PathHash, Buffer.from(JSON.stringify(document)));
        console.log(document);
        console.info('============= END : Register Document Hash ===========');
        return ('successful');
    }

    // adds the hash of the array of the last-modified time MTH of all documents in a monitored folder &
    // the hash of the File Tree Path FTH
    async addPathHash(ctx, Time, MTimeHash, TreeHash) {
        console.info('========== START : Register Modified Time Hash ==========');
        const TH = {
            index: Time,
            MTimeHash,
            TreeHash,
            docType: 'TimeHash'
        };
        // store the object in the ledger, using TimeStamp as the context for the ledger entry & future retrieval.
        await ctx.stub.putState(Time, Buffer.from(JSON.stringify(TH)));
        console.log(TH)
        console.info('============= END : Modified Time Hash ===========');
        return ('successful');
    }


    // query and retrieve document hash indexed via PathHash from the ledger.
    async queryDocHash(ctx, PathHash) {
        console.info('========== START : Read Document Hash ==========');
        const exists = await this.RecordExists(ctx, PathHash);
        if (!exists) {
            throw new Error(`The document with hash ${PathHash} does not exist`);
        }
        const result = await this.QueryLedger(ctx, "document", PathHash);
        console.log(result);
        console.info('========== END : Read Document Hash ==========');
        return result;
    }

    // Retrieve the last Modified Time Hash (MTH) & File Tree Hash (FTH) using Time Stamp as key.
    async queryPathHash(ctx, Time) {
        console.info('========== START : Read Modified Time Hash & FTH ==========');
        const exists = await this.RecordExists(ctx, Time);
        if (!exists) {
            throw new Error(`The record with time stamp ${Time} does not exist`);
        }
        const result = await this.QueryLedger(ctx, "TimeHash", Time);
        console.log(result);
        console.info('========== END : Read Modified Time Hash & FTH ==========');
        return result;
    }

}

module.exports = DocEyesContract;
