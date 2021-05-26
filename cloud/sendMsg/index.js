// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // try{
  //   const result = await cloud.openapi.subscribeMessage.send({
  //     touser:event.openid,
  //     page:'pages/home/home',
  //     data:{
  //       thing1:{
  //         value:'11111'
  //       },
  //       date2:{
  //         value:'22222'
  //       },
  //       thing6:{
  //         value:'33333'
  //       }
  //     },
  //     templateId:'qSd6jESVwR_oZqMaUCuEJMJdxYEjQYjtFtNQpRKm9rM',
      
  //   })
  //   return result
  // }catch{

  // }
}