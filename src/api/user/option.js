/**
 * 用户操作请求
 */
import ajax from '../ajax'
// 查询余额
export const queryBalance = () => ajax('/api/queryBalance', {}, 'POST')
// 存款
export const deposit = depositAmount => ajax('/api/deposit', { depositAmount }, 'GET')
// 取款
export const withdrawal = (withdrawalAmount, poundage) => ajax('/api/withdrawal', { withdrawalAmount, poundage }, 'GET')
// 转账
export const trasform = (arriveTime, cash, transAccount, poundage) => ajax('/api/transform', { arriveTime, cash, transAccount, poundage }, 'GET')
// 修改密码
export const resetPassword = newPassword => ajax('/api/resetPassword', { newPassword }, 'GET')
// 历史交易记录
export const queryTrans = (time) => ajax('/api/queryTrans', { time }, 'GET')
