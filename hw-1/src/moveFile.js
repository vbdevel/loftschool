const fs = require('fs');
const path = require('path');

function moveFile(file, dst, remove) {
    const { dir, base } = path.parse(file);
    const fileName = base;
    const fileDir = path.join(dst, fileName[0]);
    fs.mkdir(fileDir, { recursive: true }, (err) => {
        if (err) {
            console.log(`Can't create directory ${dst}`);
            exit(0);
        }
        fs.copyFile(file, path.join(fileDir, fileName), (err) => {
            if (err) {
              console.log("Error copying file: ", err);
            }
            
            fs.unlink(file, (err) => {
                if (err) {
                    console.log("Error deleting file: ", err);
                }
                console.log(`file ${file} moved to ${fileDir}`);
            });
        });
        
    });
}

module.exports = { moveFile };