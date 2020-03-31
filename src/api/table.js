import {get,post} from '@/utils/request'
let base = '';
/*
 * 用户增删查改 
 */
export const getUserData = params => { return get(`${base}/user/selectUserQueryByPage`, params); };
export const insertUserData = params => { return post(`${base}/user/addRoleUser`, params, {emulateJSON: true}); };
export const updateUserData = params => { return post(`${base}/user/updateUser`, params, {emulateJSON: true}); };
export const removeUserData = params => { return post(`${base}/user/deleteUser`, params, {emulateJSON: true}); };
export const bRemoveUserData = params => { return post(`${base}/user/deleteBatchUser`, params, {emulateJSON: true}); };
/*
 * 角色增删查改 
 */
export const getRoleData = params => { return get(`${base}/role/selectRoleQueryByPage`, params); };
export const insertRoleData = params => { return post(`${base}/role/addRole`, params, {emulateJSON: true}); };
export const updateRoleData = params => { return post(`${base}/role/updateRole`, params, {emulateJSON: true}); };
export const removeRoleData = params => { return post(`${base}/role/deleteRole`, params, {emulateJSON: true}); };
export const bRemoveRoleData = params => { return post(`${base}/role/deleteRoleBatch`, params, {emulateJSON: true}); };
