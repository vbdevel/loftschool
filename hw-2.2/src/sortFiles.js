const {readDir, stat} = require('./promisify');
const path = require('path');
const {moveFile} = require('./moveFile');

async function sortFiles(src, dst, remove) {  
    try {
        const files = await readDir(src);
        files.forEach(async (file) => {
            const fullPath = path.join(src, file);
            const srcInfo = await stat(fullPath);
            if(srcInfo.isDirectory()) {
                await sortFiles(fullPath, dst, remove);    
            }
            else {
                await moveFile(fullPath, dst, remove); 
            }
        });
    }
    catch(e) {
        console.log(`Error while reading directory: `, err);
        return 0;
    }    
}

module.exports = {sortFiles};

