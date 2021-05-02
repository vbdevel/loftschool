const express = require('express');
const app = express();

const duration = process.env.DURATION || 2000;
const interval = process.env.INTERVAL || 1000;
let runtime = 1;

app.get('/', (req, res) => {
    const timerID = setInterval(() => {
        runtime += interval*1;
        const dt = new Date();
        const time = addZero(dt.getHours()) + ':' + addZero(dt.getMinutes()) + ':' + addZero(dt.getSeconds());
       
        if(runtime > duration) {
            clearInterval(timerID); 
            const date = addZero(dt.getDate()) + '.' + addZero(dt.getMonth()+1) + '.' + dt.getFullYear();
            res.send(`${date} ${time}`);
        }
        console.log(`time: ${time}`);
     }, interval);
     
});

app.listen(8080, () => {
    console.log('Server started on port 8080');
})


function addZero(str) {
    return str.toString().length < 2 ? `0${str}` : str;
}
