// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2gh44cwi9f65894a"
})

exports.main = async (event, context) => {
  const db = cloud.database()
  return await db.createCollection('todos')
}