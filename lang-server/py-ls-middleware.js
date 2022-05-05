const rpc = require('@codingame/monaco-jsonrpc');
const server = require('@codingame/monaco-jsonrpc/lib/server');
const lsp = require('vscode-languageserver');

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8989 });

function launch(socket) {
    const reader = new rpc.WebSocketMessageReader(socket);
    const writer = new rpc.WebSocketMessageWriter(socket);
    const socketConnection = server.createConnection(reader, writer, () =>
        socket.dispose()
    );
    // 这个方法的作用
    // const serverConnection = server.createServerProcess('JSON', 'pyls');
    // const serverConnection = server.createServerProcess('JSON', 'node', [
    //     './node_modules/vls/dist/vueServerMain.js',
    // ]);
    const serverConnection = server.createServerProcess('JSON', 'node', [
        '/Users/fengshiyu/github/vetur/server/dist/vueServerMain.js',
    ]);
    server.forward(socketConnection, serverConnection, (message) => {
        if (rpc.isRequestMessage(message)) {
            if (message.method === lsp.InitializeRequest.type.method) {
                const initializeParams = message.params;
                initializeParams.processId = process.pid;
                console.log(initializeParams);

                // 增加了register language后，通信ok了
                // 但是通信的时候传递的textDocument的uri传递的不多
                // 可以看下vetur是怎么传递的
                // initializeParams.workspaceFolders = [
                //     {
                //         uri: '/',
                //         name: 'test',
                //         index: 0,
                //     },
                // ];
            }
        }
        // if (rpc.isRequestMessage(message)) {
        //     console.log(message);
        // }
        // if (rpc.isResponseMessage(message)) {
        //     console.log(message);
        // }
        // if (rpc.isNotificationMessage(message)) {
        //     console.log(message);
        // }

        // if (message.method === 'textDocument/codeAction') {
        //     console.log(message.params.range, 'request的json rpc');
        // }
        // console.log(message, 'request的json rpc');
        return message;
    });
}

wss.on('connection', function connection(ws) {
    const socket = {
        send: (content) =>
            ws.send(content, (error) => {
                if (error) {
                    console.log(error);
                }
            }),
        onMessage: (cb) => ws.on('message', cb),
        onError: (cb) => ws.on('error', cb),
        onClose: (cb) => ws.on('close', cb),
        dispose: (cb) => ws.close(),
    };
    launch(socket);
});
