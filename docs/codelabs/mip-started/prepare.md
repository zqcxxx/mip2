# 2. 准备环境

1. 安装/升级 mip 命令行工具

    ```bash
    npm install mip2 -g
    ```

    > info 输入`mip2 -V`，若能正常显示版本号，说明已经安装成功。
    > info 如果不成功可以在根目录尝试

    ```bash
    sudo npm install mip2 -g
    ```

2. 在合适的目录新建项目并命名，例如本教程中的 "mip-project0"

    ```bash
    mip2 init
    ```
    ![mip2 init](http://bos.nj.bpc.baidu.com/assets/mip/codelab/mip-init.jpeg)

3. 进入目录并启动开发服务器

    ```bash
    mip dev
    ```
    ![mip2 dev](http://bos.nj.bpc.baidu.com/assets/mip/codelab/mip-dev.jpeg)

4. 访问 http://127.0.0.1:8111/example/index.html 将看到初始 example 页面

    ![example Page](http://bos.nj.bpc.baidu.com/assets/mip/codelab/home-init.png)

接下来我们会通过一些代码的修改来进一步加深印象，了解 MIP 的主要功能。