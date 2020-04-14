import {get,post} from '@/utils/request'
let base = '';
/*
 * 组织增删查改
 */
export const getOrganData = params => { return get(`${base}/organization/findOutAllPeople`, params); };
export const getChildOrganData = params => { return get(`${base}/organization/selectByParentId`, params); };
export const insertOrganData = params => { return post(`${base}/organization/insert`, params, {emulateJSON: true}); };
export const updateOrganData = params => { return post(`${base}/organization/updateByPrimaryKeySelective`, params, {emulateJSON: true}); };
export const removeOrganData = params => { return post(`${base}/organization/deleteByPrimaryKey`, params, {emulateJSON: true}); };
export const relationKeyPersonnel = params => { return post(`${base}/organization/relationKeyPersonnel`, params, {emulateJSON: true}); };
export const relationAdmin = params => { return post(`${base}/organization/relationAdmin`, params, {emulateJSON: true}); };
export const findPresent = params => { return post(`${base}/organization/findPresent`, params, {emulateJSON: true}); };
export const selectPresent = params => { return get(`${base}/organization/selectPresent`, params); };
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
export const updateEquipData = params => { return post(`${base}/equipment/update`, params, {emulateJSON: true}); };
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
export const getPerWarnlData = params => { return get(`${base}/personnel/selectPersonnelAlert`, params); };
export const getWarnListData = params => { return get(`${base}/personnel/selectByPage`,params); };
export const changeWarnData = params => { return post(`${base}/personnel/update`,params, {emulateJSON: true} ) }

/*
 *设备预警信息查询
 */
export const getEquWarnlData = params => { return get(`${base}/equipmentalert/selectByPage`, params); };
/*
 *预案管理增删查改
 */

export const getPlanQueryData = params => { return get(`${base}/ReservePlan/selectReservePlanQueryByPage`, params); };
export const deleteRelationReservePlan = params => { return post(`${base}/ReservePlan/deleteRelationReservePlan`, params, {emulateJSON: true}); };
export const insertPlan = params => { return post(`${base}/ReservePlan/insertPlan`, params, {emulateJSON: true}); };
export const addReservePlan = params => { return post(`${base}/ReservePlan/addReservePlan`, params, {emulateJSON: true}); };
export const insertAlertCondition = params => { return post(`${base}/ReservePlan/insertAlertCondition`, params, {emulateJSON: true}); };
export const updatePlan = params => { return post(`${base}/ReservePlan/updatePlan`, params, {emulateJSON: true}); };
export const updateReservePlanAndCondition = params => { return post(`${base}/ReservePlan/updateReservePlanAndCondition`, params, {emulateJSON: true}); };
export const relationReservePlan = params => { return post(`${base}/ReservePlan/relationReservePlan`, params, {emulateJSON: true}); };
export const deleteReservePlan = params => { return post(`${base}/ReservePlan/deleteReservePlan`, params, {emulateJSON: true}); };
export const relationReservePlanList = params => { return get(`${base}/keypersonnel/selectPlan`, params); };
/*
 *人员状态模块接口
 */
export const getPerSe = params => { return get(`${base}/PersonnelStatus/se`, params); }; //活动状态统计
export const getPersonAlert = params => { return get(`${base}/PersonnelStatus/selectPersonnelAlert`, params); }; //电子围栏预警记录
export const getPersonCoordinate = params => { return get(`${base}/PersonnelStatus/selectPersonnelCoordinate`, params); };  //轨迹查询
export const getPersonStatusQuery = params => { return get(`${base}/PersonnelStatus/selectPersonnelStatusQueryByPage`, params); }; //分页查询

/*
 * 电子围栏相关
 */
export const addElectronicFence = params => { return post(`${base}/ElectronicFence/addElectronicFence`, params, {emulateJSON: true}); }; //添加电子围栏
export const deleteElectronicFence = params => { return post(`${base}/ElectronicFence/deleteElectronicFence`, params, {emulateJSON: true}); }; //删除电子围栏
export const deleteElectronicFenceBatch = params => { return post(`${base}/ElectronicFence/deleteElectronicFenceBatch`, params, {emulateJSON: true}); }; //批量删除电子围栏
export const getElectronicFence = params => { return get(`${base}/ElectronicFence/getElectronicFence`, params); };//根据id查询电子围栏
export const selectElectronicFenceQuery = params => { return get(`${base}/ElectronicFence/selectElectronicFenceQueryByPage`, params); };//分页查询
export const updateElectronicFence = params => { return post(`${base}/ElectronicFence/fenceRelationKyeUser`, params, {emulateJSON: true}); };//更新电子围栏

/*
 * 看板相关
 */

export const equipmentStatistics = params => { return get(`${base}/home/equipmentStatistics`, params); };
export const keyPersonnelEarly = params => { return get(`${base}/home/keyPersonnelEarly`, params); };
export const keyPersonnelStatistics = params => { return get(`${base}/home/keyPersonnelStatistics`, params); };
export const selectCount = params => { return get(`${base}/home/selectCount`, params); };
export const selectWlCount = params => { return get(`${base}/home/selectWlCount`, params); };
export const userRoleStatistics = params => { return get(`${base}/home/userRoleStatistics`, params); };
