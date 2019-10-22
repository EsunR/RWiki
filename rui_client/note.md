切换用户登录信息有几个坑：

当用户首次启动应用并没有登录时，localstroge 中没有 Token，但是此时全局的 axios 已经加载完整，所以这时全局设置的 Authorization 信息是空的，所以在单页应用中我们不能通过 axios 全局设置 Authorization，我们需要使用请求拦截器，当每次发送请求时，将请求头的 Authorization 设置为当前 localstroge 下的 Token。

同时首页需要重新获取信息