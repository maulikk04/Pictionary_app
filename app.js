const express = require('express');
const { log } = require('node:console');
const {createServer}  = require('node:http');
const {Server} = require('socket.io');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

async function start() {
    try {
        const server = createServer(app);
        const io = new Server(server,{
            connectionStateRecovery:{}
        })
        io.on('connection', async(socket)=>{
            console.log('user connected');
            socket.on('username' , (name)=>{
                socket.username= name;
                console.log(`${name} connected`);
                io.emit('username',name);
            })
            app.get('/draw',(req,res)=>{
                res.render('draw' , {username:socket.username});
            })
        })
        app.get('/', (req, res) => {
            res.render('home');
        })
        server.listen('5000', () => {
            console.log("Server is running on port 5000");
        })

    } catch (error) {
        console.log(error);
    }
}
start();
