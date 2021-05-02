const http = require('http');

const duration = process.env.DURATION || 2000;
const interval = process.env.INTERVAL || 1000;
let runtime = 1;

http.createServer( (req, res) => {
    if(req.method === 'GET') {
        const timerID = setInterval(() => {
            runtime += interval*1;
            const dt = new Date();
            const time = addZero(dt.getHours()) + ':' + addZero(dt.getMinutes()) + ':' + addZero(dt.getSeconds());
           
            if(runtime > duration) {
                clearInterval(timerID); 
                const date = addZero(dt.getDate()) + '.' + addZero(dt.getMonth()+1) + '.' + dt.getFullYear();
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(`${date} ${time}`);
                res.end();
            }
            console.log(`time: ${time}`);
         }, interval);
    }
    
}).listen(8080);
console.log('http server running on port 8080');


function addZero(str) {
    return str.toString().length < 2 ? `0${str}` : str;
}
