<!-- ## How To Use Monaco Editor In Vue JS
The helper repo for the article: [How To Use Monaco Editor In VueJS: The missing guide](https://ruhshan-ahmed.medium.com/how-to-use-monaco-editor-in-vuejs-the-missing-guide-1aa7ac61ed12)

### How to run
Clone the repo
```shell
git clone https://github.com/Ruhshan/Vue-monaco-demo
````

Run the docker containers
```shell
docker-compose up
```

Open In browser [http://localhost:8020](http://localhost:8020) -->

How to run:

for app:
    cd app -> yarn -> yarn run server

for lang-server:
    cd lang-server -> yarn -> node py-ls-middleware.js

and then open http://172.19.200.162:8081/ on your browser

Question:
    after above works, the client and the server both runing, and rpc communication is success.
    but no intelligent feature.