import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
  });

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

io.on('connection', (socket) => { 
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
