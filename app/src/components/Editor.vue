<template>
    <div id="editor" style="width: 500px; height: 500px"></div>
</template>

<script>
import { listen } from 'vscode-ws-jsonrpc';

import s from '../utils/language.js';
console.log(s);

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
            const editorOptions = {
                // language: "python",
                language: 'vue',
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
                    // documentSelector: ["python"],
                    documentSelector: [{ scheme: 'file', language: 'vue' }],
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
