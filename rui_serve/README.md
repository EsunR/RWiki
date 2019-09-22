# 1. 数据库

### password

> 存放用户的密码，用于签发 token

- uid
- password：用户密码（加密）

### token

> 当前用户对应的有效 Token

- uid
- tid: 有效 Token 的 ID

# Token

## Token记录的信息

- uid: 用户id
- tid: token id（token建立的时间戳）

## 签发流程

![Token签发流程.png](https://i.loli.net/2019/09/20/sY9hOxQWzcriFaq.png)
