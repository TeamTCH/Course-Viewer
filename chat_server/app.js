var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());


//---------------------------------------------
// Server setup
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('SEND_MESSAGE', function(data) {
      io.emit('MESSAGE', data)
   });
 
   //Whenever someone disconnects this piece of code executed
   //socket.on('disconnect', function () {
     // console.log('A user disconnected');
   //});
 });

http.listen(3000, function() {
   console.log('listening on *:3000');
});