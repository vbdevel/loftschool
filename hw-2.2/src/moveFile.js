const path = require('path');
const {mkdir, copyFile, unlink } = require('./promisify');

async function moveFile (src, dst, remove) {
    const { dir, base } = path.parse(src);
    const fileName = base;
    const fileDir = path.join(dst, fileName[0]);
    try {
        await mkdir(fileDir, { recursive: true });
        await copyFile(src, path.join(fileDir, fileName));
        await unlink(src);
    }
    catch(e) {
        console.log('Error while moving file: ', e);
    }   
}

module.exports = { moveFile };