/**
 * 用户操作请求
 */
import ajax from '../ajax'
// 查询余额
export const queryBalance = () => ajax('/queryBalance', {}, 'POST')
// 存款
export const deposit = depositAmount => ajax('/deposit', { depositAmount }, 'GET')
// 取款
export const withdrawal = (withdrawalAmount, poundage) => ajax('/withdrawal', { withdrawalAmount, poundage }, 'GET')
// 转账
export const trasform = (arriveTime, cash, transAccount, poundage) => ajax('/transform', { arriveTime, cash, transAccount, poundage }, 'GET')
// 修改密码
export const resetPassword = newPassword => ajax('/resetPassword', { newPassword }, 'GET')
// 历史交易记录
export const queryTrans = (time) => ajax('/queryTrans', { time }, 'GET')
