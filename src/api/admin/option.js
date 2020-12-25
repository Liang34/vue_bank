import ajax from '../ajax'
// 开户url
export const openAccount = (dname, didcard, dsex, dphone, daddress) => ajax('/api/admin/userInfo', { dname, didcard, dsex, dphone, daddress }, 'POST')
export const openCard = (dno, bpassword, btype) => ajax('/api/admin/bankcardInfo', { dno, bpassword, btype }, 'POST')
// // 销户
// export const destoryCard = (bno, didcard) => ajax('/api/admin/destroy', { bno, didcard }, 'GET')
// // 挂失
// export const loss = (bno, didcard) => ajax('/api/admin/loss', { bno, didcard }, 'GET')
// // 解挂
// export const lsolution = (bno, didcard) => ajax('/api/admin/lsolution', { bno, didcard }, 'GET')
// // 冻结
// export const frozen = (bno, didcard) => ajax('/api/admin/frozen', { bno, didcard }, 'GET')
// // 解冻
// export const fsolution = (bno, didcard) => ajax('/api/admin/frozen', { bno, didcard }, 'GET')
export const updateState = (bno, didcard, status) => ajax('/api/admin/updateStatus', { bno, didcard, status }, 'GET')
// 修改密码
export const queryUserInfo = bno => ajax('/api/admin/queryUserInfo', { bno }, 'GET')
export const resetUserPassword = (newPassword, bno) => ajax('/api/admin/resetUserPassword', { newPassword, bno }, 'GET')
// 查询余额
export const queryBalance = bno => ajax('/api/admin/queryBalance', { bno }, 'GET')
// 查询历史交易记录
export const queryUserTrans = (bno, time) => ajax('/api/admin/queryUserTrans', { bno, time }, 'GET')
export const queryBankTrans = (time) => ajax('/api/admin/queryBankTrans', { time }, 'GET')
// 查询所有用户
export const queryAllUser = () => ajax('/api/admin/queryAllUser', {}, 'GET')
