<template>
    <div id="editor" style="width: 500px; height: 500px"></div>
</template>

<script>
import { listen } from '@codingame/monaco-jsonrpc';
import vscode from 'vscode';

// import s from '../utils/language.js';
// console.log(s);

window.setImmediate = window.setTimeout;

import {
    MonacoLanguageClient,
    CloseAction,
    ErrorAction,
    createConnection,
    MonacoServices,
} from 'monaco-languageclient';

import loader from '@monaco-editor/loader';

// "languages": [
//   {
//     "id": "vue",
//     "aliases": [
//       "Vue",
//       "vue"
//     ],
//     "extensions": [
//       ".vue"
//     ],
//     "configuration": "./languages/vue-language-configuration.json"
//   },
//   {
//     "id": "vue-html",
//     "aliases": [
//       "Vue-html"
//     ],
//     "configuration": "./languages/vue-html-language-configuration.json"
//   },
//   {
//     "id": "vue-postcss",
//     "aliases": [
//       "Vue-PostCSS",
//       "Vue-POSTCSS",
//       "vue-postcss"
//     ],
//     "configuration": "./languages/vue-postcss-language-configuration.json"
//   },
//   {
//     "id": "vue-sugarss",
//     "aliases": [
//       "Vue-SugarSS",
//       "Vue-SUGARSS",
//       "vue-sugarss"
//     ],
//     "configuration": "./languages/vue-sugarss-language-configuration.json"
//   }
// ],
export default {
    name: 'Editor',
    async mounted() {
        // registerLanguage({
        //     id: 'vue',
        //     extensions: ['.vue'],
        //     aliases: ['Vue', 'vue'],
        //     loader: () => {
        //         return import('../languages/vue-language-configuration.js');
        //     },
        // });
        loader.init().then((monaco) => {
            monaco.languages.register({
                id: 'vue',
            });
            monaco.languages.onLanguage('vue', () => {
                console.log('是vue文件');
            });
            // const a = monaco.editor.createModel('1', 'vue', monaco.Uri.parse('/test1'));
            // console.log(a.getValue());
            const code = [
                'const a = 123;',
                'console.log(languageDefinitions);',
            ];
            const editorOptions = {
                // language: 'vue',
                // language: "python",
                model: monaco.editor.createModel(
                    code.join('\n'),
                    'vue',
                    monaco.Uri.parse(
                        '/Users/xx/github/lsp-adventure/app/src/utils/language.js'
                    )
                ),

                minimap: { enabled: true },
            };

            monaco.editor.create(
                document.getElementById('editor'),
                editorOptions
            );

            MonacoServices.install(monaco);
            this.connectToLangServer();
        });
    },
    methods: {
        createLanguageClient: function (connection) {
            return new MonacoLanguageClient({
                name: 'Monaco language client',
                clientOptions: {
                    workspaceFolder: {
                        uri: vscode.Uri.parse('/'),
                        name: 'test',
                        index: 0,
                    },
                    // middleware: {
                    //     workspace: {
                    //         configuration: (params, token, configuration) => {
                    //             console.log(params, token, configuration);
                    //             return [{ foo: 'bar' }];
                    //         },
                    //     },
                    // },
                    // documentSelector: ["python"],
                    // documentSelector: [{ scheme: 'file', language: 'vue' }],
                    documentSelector: [
                        {
                            language: 'vue',
                            scheme: 'file',
                        },
                    ],
                    errorHandler: {
                        error: () => ErrorAction.Continue,
                        closed: () => CloseAction.Restart,
                    },
                },

                connectionProvider: {
                    get: (errorHandler, closeHandler) => {
                        return Promise.resolve(
                            createConnection(
                                connection,
                                errorHandler,
                                closeHandler
                            )
                        );
                    },
                },
            });
        },
        connectToLangServer: function () {
            const webSocket = new WebSocket('ws://127.0.0.1:8989');

            listen({
                webSocket: webSocket,
                onConnection: (connection) => {
                    var languageClient = this.createLanguageClient(connection);
                    console.log(languageClient._c2p);
                    var disposable = languageClient.start();

                    connection.onClose(function () {
                        return disposable.dispose();
                    });

                    connection.onError(function (error) {
                        console.log(error);
                    });
                },
            });
        },
    },
};
</script>
