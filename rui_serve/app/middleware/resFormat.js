const format = async (ctx, next) => {
  console.log("正在访问：", ctx.url);
  await next()
}

module.exports = format;