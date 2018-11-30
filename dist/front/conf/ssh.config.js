// var appName = 'wxdc';
module.exports = {
    //上传配置
    ssh: {
        host: '**********', //远程服务器地址
        port: 22,
        username: 'root', //远程服务器账号
        password: '*****', //远程服务器密码
    },
    remoteDir: `/home/webapps`, //远程服务器项目目录地址
    commands: [
        //删除现有文件
        `rm -rf /home/webapps`,
        // `rm -f /storage/www/html/${appName}/index.html`
    ]
};
