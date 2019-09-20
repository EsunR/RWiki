module.exports = {
  port: 6815,
  dbUrl: "mongodb://localhost:27017/rui",
  saltTimes: 3, // 用户密码加盐的次数
  jwtSecret: "entry_you_tsecret", // jwt 的密钥
  jwtExpiresTime: 72 * 3600 * 1000, // token 过期的时间
  maxDevices: 3, // 系统允许登录的最多设备数
  tokePrefix: "Bearer"
}