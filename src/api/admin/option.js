import ajax from '../ajax'
// 开户url
export const openAccount = (dname, didcard, dsex, dphone, daddress) => ajax('/admin/userInfo', { dname, didcard, dsex, dphone, daddress }, 'POST')
export const openCard = (dno, bpassword, btype) => ajax('/admin/bankcardInfo', { dno, bpassword, btype }, 'POST')
// // 销户
// export const destoryCard = (bno, didcard) => ajax('/admin/destroy', { bno, didcard }, 'GET')
// // 挂失
// export const loss = (bno, didcard) => ajax('/admin/loss', { bno, didcard }, 'GET')
// // 解挂
// export const lsolution = (bno, didcard) => ajax('/admin/lsolution', { bno, didcard }, 'GET')
// // 冻结
// export const frozen = (bno, didcard) => ajax('/admin/frozen', { bno, didcard }, 'GET')
// // 解冻
// export const fsolution = (bno, didcard) => ajax('/admin/frozen', { bno, didcard }, 'GET')
// 0,1,guashi2,dongjie3,xiaohu
export const updateState = (bno, status) => ajax('/admin/updateStatus', { bno, status }, 'GET')
// 修改密码
export const queryUserInfo = bno => ajax('/admin/queryUserInfo', { bno }, 'GET')
export const resetUserPassword = (newPassword, bno) => ajax('/admin/resetUserPassword', { newPassword, bno }, 'GET')
// 查询余额
export const queryBalance = bno => ajax('/admin/queryBalance', { bno }, 'GET')
// 查询历史交易记录
export const queryUserTrans = (bno, startTime, endTime) => ajax('/admin/queryUserTrans', { bno, startTime, endTime }, 'GET')
export const queryBankTrans = (startTime, endTime) => ajax('/admin/queryBankTrans', { startTime, endTime }, 'GET')
// 查询所有用户
export const queryAllUser = () => ajax('/admin/queryAllUser', {}, 'GET')
