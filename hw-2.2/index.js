const { exit } = require('process');
const { mkdir, rmdir, stat, readDir } = require('./src/promisify');
const { sortFiles } = require('./src/sortFiles');
const path = require('path');
const args = process.argv.slice(2);

if(args.length < 3) {
    console.log(`Enter 3 parameters: src dir, dst dir and flag (0: don't remove src, 1: remove src`);
    exit(0); 
}

const [src, dst, remove] = args;
let directories = [src];

( async function () {
    console.log('start ', remove);
    try {
        await mkdir(dst, { recursive: true });
        const info = await stat(src);
        console.log('info: ', info);
        if(!info.isDirectory) {
            console.log(`src isn't directory`);
            exit(1);
        }
        await sortFiles(src, dst);

        if(remove === '1') {
            await getDirList(src);
            for(dir of directories.reverse()) {
                await rmdir(dir);
            }
        }
    }
    catch (e) {
        console.log('Error: ', e);
        exit(1);
    }
    console.log('end');
}) ();


async function getDirList(baseDir) {  
    
    try {
        const dirs = await readDir(baseDir);
        for(const dir of dirs) {
            directories.push(path.join(baseDir, dir));
            await getDirList(path.join(baseDir, dir));    
        };
    }
    catch(e) {
        console.log(`Error while deleting directory: `, e);
        return 0;
    }          
}




