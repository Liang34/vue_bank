import ajax from '../ajax'
// 验证账号正确
export const checkAccount = bno => ajax('/checkAccount', { bno }, 'POST')
// 验证密码
export const checkPassword = (bno, bpassword) => ajax('/checkPassword', { bno, bpassword }, 'POST')
// 退出登录
export const logout = () => ajax('/logout', {}, 'GET')
