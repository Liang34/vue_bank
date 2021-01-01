import ajax from '../ajax'
// 管理员登录
// export const adminLogin = (ano, apassword) => ajax('/admin/login', { ano, apassword }, 'POST')
export const adminLogin = (ano, apassword) => ajax('/admin/login', { ano, apassword }, 'POST')
export const logoutadmin = () => ajax('/admin/logoutadmin', {}, 'GET')
