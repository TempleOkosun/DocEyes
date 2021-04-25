const fsBase = require('fs');
const fs = fsBase.promises;
const path = require('path')

let results = [];
async function walkDir(directory){
    const contents = await fs.readdir(directory, 'utf8');
    for (const content of contents) {
        let stats = await fs.lstat(path.resolve(directory, content));
        if(stats.isDirectory()){
            await walkDir(path.resolve(directory, content));
        } else{
            results.push(path.join(directory, content))
        }

    }
    return results;
}

module.exports = walkDir;


