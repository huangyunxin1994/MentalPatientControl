import {get,post} from '@/utils/request'
let base = '';
/*
 * 组织增删查改 
 */
export const getOrganData = params => { return get(`${base}/organization/findOutAllPeople`, params); };
export const getChildOrganData = params => { return get(`${base}/organization/selectByParentId`, params); };
export const insertOrganData = params => { return post(`${base}/user/addRoleUser`, params, {emulateJSON: true}); };
export const updateOrganData = params => { return post(`${base}/organization/updateByPrimaryKeySelective`, params, {emulateJSON: true}); };
export const removeOrganData = params => { return post(`${base}/organization/deleteByPrimaryKey`, params, {emulateJSON: true}); };
export const bRemoveOrganData = params => { return post(`${base}/user/deleteBatchUser`, params, {emulateJSON: true}); };
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
export const getAllMenu = params => { return get(`${base}/role/selectAllMenu`, params); };
//查询用户拥有角色或角色拥有用户
export const getQueryUserRole = params => { return post(`${base}/role/queryUserRole`, params,{emulateJSON: true}); };
//用户添加角色或角色添加用户
export const addUserRole = params => { return post(`${base}/role/addUserRole`, params,{emulateJSON: true}); };
//用户删除角色或角色删除用户
export const deleteUserRole = params => { return post(`${base}/role/deleteUserRole`, params,{emulateJSON: true}); };
export const addRoleRelationMenu = params => { return post(`${base}/role/addRoleRelationMenu`, params, {emulateJSON: true}); };
/*
 * 设备增删查改 
 */
export const getEquipData = params => { return get(`${base}/equipment/selectByPage`, params); };
export const insertEquipData = params => { return post(`${base}/equipment/insert`, params, {emulateJSON: true}); };
export const updateEquipData = params => { return post(`${base}/role/updateRole`, params, {emulateJSON: true}); };
export const removeEquipData = params => { return post(`${base}/equipment/deleteEquipment`, params, {emulateJSON: true}); };
/*
 * 重点人员增删查改 
 */
export const getKeyPnlData = params => { return get(`${base}/keypersonnel/selectByPage`, params); };
export const insertKeyPnlData = params => { return post(`${base}/keypersonnel/insert`, params, {emulateJSON: true}); };
export const updateKeyPnlData = params => { return post(`${base}/keypersonnel/updateKeyPersonnel`, params, {emulateJSON: true}); };
export const removeKeyPnlData = params => { return post(`${base}/keypersonnel/deleteByPrimaryKey`, params, {emulateJSON: true}); };
//export const bRemoveKeyPnlData = params => { return post(`${base}/role/deleteRoleBatch`, params, {emulateJSON: true}); };

/*
 *人员预警信息查询
 */
export const getPerWarnlData = params => { return get(`${base}/personnel/selectByPage`, params); };

/* 
 *预案管理增删查改
 */

export const getPlanQueryData = params => { return get(`${base}/ReservePlan/selectReservePlanQueryByPage`, params); };

/* 
 *人员状态模块接口 
 */
export const getPerSe = params => { return get(`${base}/PersonnelStatus/se`, params); }; //活动状态统计
export const getPersonAlert = params => { return get(`${base}/PersonnelStatus/selectPersonnelAlert`, params); }; //电子围栏预警记录
export const getPersonCoordinate = params => { return get(`${base}/PersonnelStatus/selectPersonnelCoordinate`, params); };  //轨迹查询
export const getPersonStatusQuery = params => { return get(`${base}/PersonnelStatus/selectPersonnelStatusQueryByPage`, params); }; //分页查询


