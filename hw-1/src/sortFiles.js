const fs = require('fs');
const path = require('path');
const { moveFile } = require('./moveFile');

function sortFiles(dir, dst, remove) {    
    fs.readdir(dir, (err, files) => {
        if(err) {
            console.log(`Error getting directory listing`);
            exit(0);    
        }
        
        files.forEach( (file) => {
            const fullPath = path.join(dir, file);
            fs.stat(fullPath, (err, stats) => {
                if(err) {
                    console.log(`can't get stats of ${fullPath}`);
                    exit(0);
                }

                if(stats.isDirectory()) {
                    sortFiles(fullPath, dst, remove);
                    fs.rmdir(fullPath, () => { });
                }
                else {
                    moveFile(fullPath, dst); 
                }
            });

        });    
        
    });
}

module.exports = { sortFiles };