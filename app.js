//importar as configurações do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(80, function(){
    console.log("servidor online");
})

var io = require('socket.io').listen(server);
app.set('io', io);
//criar conexao com websocket
io.on('connection', function(socket){
    console.log('usuario conectou');
    socket.on('disconnect', function(){
        console.log("usuario desconectou");
    })

    
    
    socket.on('msgParaServidor', function(data){
        //envia mensagens dos usuários
        socket.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem,
            
        });
        socket.broadcast.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        });

        //atualiza relação de participantes online
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit('participantesParaCliente', {
                apelido: data.apelido,
            });
            socket.broadcast.emit('participantesParaCliente', {
                apelido: data.apelido,
            });
        }
    });

    
    
    
});

