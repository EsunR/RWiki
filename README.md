# 1. 安装 & 运行

前置条件：

- MongoDB
- NodeJS

```sh
$ cd ./rui_serve
$ cnpm install
$ node serve.js
```

访问：http://localhost:6815

# 2. 编译前端文件

```sh
$ cd ./rui_client
$ npm run build
```

编译的文件将存放于 `./rui_serve/static` 目录下