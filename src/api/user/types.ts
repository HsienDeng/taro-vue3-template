export interface LoginResult {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  username: string;
  user_id: number;
  nickname: string;
  rolePermissions: any;
  logintime: string;
  phone: string;
  client_id: string;
  app_id: any;
}

export interface UserInfoVo {
  msg?: string;
  rolesFull?: RolesFull[];
  tagList?: TagList[];
  code?: number;
  permissions?: string[];
  roles?: string[];
  professionList?: number[];
  user?: User;
  apps?: App[];
}

export interface RolesFull {
  createBy: any;
  createTime: any;
  updateBy: any;
  updateTime: any;
  remark: any;
  beginTime: any;
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: any;
  dataScope: string;
  status: string;
  delFlag: any;
  flag: boolean;
  appId: any;
  menuIds: any;
  deptIds: any;
  userIds: any;
  appIds: any;
  appList: any;
  userList: any;
  userId: any;
  appName: any;
  pageNum: any;
  pageSize: any;
  admin: boolean;
}

export interface TagList {
  createBy: any;
  createTime: any;
  updateBy: any;
  updateTime: any;
  remark: any;
  beginTime: any;
  utId: number;
  userId: number;
  tagId: number;
}

export interface User {
  createBy: string;
  createTime: string;
  updateBy: any;
  updateTime: any;
  remark: any;
  beginTime: any;
  uuid: any;
  code: any;
  userId: number;
  deptId: any;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  jobNumber: any;
  isFromHospital: string;
  sex: string;
  avatar: string;
  password: any;
  salt: any;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: any;
  dept: any;
  roles: Role[];
  roleIds: any;
  postIds: any;
  tagIds: any;
  certificateFileId: any;
  professionId: any;
  professionIdIds: any;
  card: any;
  authStatus: string;
  signStatus: string;
  signUuid: any;
  signFileId: any;
  applyForRole: any;
  loginFailCount: number;
  loginFailTime: any;
  agreementConfirmation: boolean;
  completePasswordUpdate: boolean;
  smsOn: string;
  roleKey: any;
  careerFileIds: any;
  gcpFileIds: any;
  resumeFileIds: any;
  gcpFileDate: any;
  resumeFileDate: any;
  mcStatus: any;
  wxOpenId: any;
  wxUnionId: any;
  wxNickname: any;
  userIp: string;
  admin: boolean;
}

export interface Role {
  createBy: any;
  createTime: any;
  updateBy: any;
  updateTime: any;
  remark: any;
  beginTime: any;
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: any;
  dataScope: string;
  status: string;
  delFlag: any;
  flag: boolean;
  appId: any;
  menuIds: any;
  deptIds: any;
  userIds: any;
  appIds: any;
  appList: any;
  userList: any;
  userId: any;
  appName: any;
  pageNum: any;
  pageSize: any;
  admin: boolean;
}

export interface App {
  appId: number;
  appName: string;
  appDescription: string;
  appUrl: string;
  appStatus: number;
  createBy: any;
  createTime: string;
  updateBy: string;
  updateTime: string;
  clientId: string;
}
