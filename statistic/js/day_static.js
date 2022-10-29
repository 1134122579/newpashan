const db=wx.cloud.database
var st={
async day_statistic(){
  return await db.collection('user')
}
}
module.exports=st