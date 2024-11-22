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
