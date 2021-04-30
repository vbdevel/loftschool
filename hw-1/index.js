const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const { sortFiles } = require('./src/sortFiles');
const args = process.argv.slice(2);

if(args.length < 3) {
    console.log(`Enter 3 parameters: src dir, dst dir and flag (0: don't remove src, 1: remove src`);
    exit(0); 
}

const [src, dst, remove] = args;

fs.mkdir(dst, { recursive: true }, (err) => {
    if (err) {
        console.log(`Can't create directory ${dst}`);
        exit(0);
    }
});

fs.stat(src, (err, dirStats) => {
    if(err) {
        console.log(`src isn't exists`);
        exit(0);
    }

    if(!dirStats.isDirectory) {
        console.log(`src isn't directory`);
        exit(0);
    }

    sortFiles(src, dst, remove);
    if(remove === 1) {
        fs.rmdir('./ssdir', { recursive: true }, (err) => { 
            if(err) {
                console.log(err);
            }
            console.log('DELETED ', src);
        });
    }   
})
/*
process.on('exit', () => {
    console.log('on exit', src);
    fs.rmdir('./ssdir', { recursive: true }, (err) => { 
        if(err) {
            console.log(err);
        }
        console.log('DELETED');
    });
});
*/

