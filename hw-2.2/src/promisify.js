const fs = require('fs');
const { resolve } = require('path');

const mkdir = (dst, options) => {
    return new Promise( (resolve, reject) => {
        fs.mkdir(dst, options, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });    
    });
}

const rmdir = (dir, options) => {
    return new Promise( (resolve, reject) => {
        fs.rmdir(dir, options, (err, result) => { 
            if(err) {
                reject(err);
            }
            resolve(result);
        });
    }); 
}

const stat = (file, options) => {
    return new Promise( (resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if(err) {
                reject(err);
            }
            resolve(stats);
        });
    });    
}

const readDir = (dir) => {
    return new Promise( (resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if(err) {
                reject(err);  
            }
            resolve(files);
        });    
    });
}

const copyFile = (src, dst) => {
    return new Promise( (resolve, reject) => {
        fs.copyFile(src, dst, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });    
    });
}

const unlink = (file) => {
    return new Promise( (resolve, reject) => {
        fs.unlink(file, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });    
    });
}

module.exports = {
    mkdir,
    rmdir,
    copyFile,
    readDir,
    unlink,
    stat
}