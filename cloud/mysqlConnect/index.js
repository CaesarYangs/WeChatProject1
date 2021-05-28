// 云函数入口文件
const cloud = require('wx-server-sdk')
const mysql = require('mysql2/promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  let res;
  try {
    const connection =await mysql.createConnection({
      host: process.env.host,
      database: process.env.database,
      user: process.env.username,
      password: process.env.password,
      // host: panel.cyang.site,
      // database: 'mini1',
      // user: 'yyq',
      // password: 'yyq132456',
    })
   var sql = event.sql;
   var params = event.params;
   res = await connection.execute(sql,params);
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
  return {
    res,
    code:200
  }
}
