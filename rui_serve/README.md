# 1. 数据库

### 1.1 users

- identity
- tokens **Array**
- name
- password
- time

## 1.2 projects

- projectName
- desc
- cover
- creator **ObjectId `ref: users`**

- partners **Array [ObjectId `ref: users`]**

- article **Array**
  - title
  - md
  - html
  - created_at
  - updated_at
- created_at
- updated_at

# 2. Token

## Token记录的信息

- uid: 用户id
- tid: token id（token建立的时间戳）

## 签发流程

![Token签发流程.png](https://i.loli.net/2019/09/20/sY9hOxQWzcriFaq.png)
