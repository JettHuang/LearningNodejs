**安装 Node**

请到 Node 官网nodejs.org，或者国内镜像npm.taobao.org/mirrors/node，下载最新版本的安装包。
安装完成后，命令行执行下面的命令，确认是否安装成功。

$ node -v

Node 的模块管理器 npm 会一起安装好。由于 Node 的官方模块仓库网速太慢，模块仓库需要切换到阿里的源。

$ npm config set registry https://registry.npm.taobao.org/

执行下面的命令，确认是否切换成功。

$ npm config get registry

**NPM安装各组件**

$ npm install xxxx

