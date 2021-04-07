

var io = require('socket.io')(process.env.PORT || 3000);

var port = process.env.PORT || 3000

io.on('connection', socket =>{
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message',({recipients,text})=>{
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r=> r!==recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('recieve-message',{
                recipients:newRecipients,
                sender: id,text
            })            
        });
    })
})

http.listen(port,function(){
    console.log('listening on port');
})