import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
import { getUserInfo, login } from "@/api/user";

export const useUserStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
    username: "",
    userInfo: "",
    permissions: "",
    userType: "",
    curRole: "",
  }),
  actions: {
    pwdLoginAciton(params) {
      return new Promise((resolve, reject) => {
        Taro.showLoading({
          title: "正在登录...",
        });
        login(params)
          .then(async (res) => {
            Taro.hideLoading();
            if (res.code === 200) {
              const data = res.data;
              this.token = data.access_token;
              Taro.setStorageSync("token", data.access_token);
              this.username = params.username;
              await this.userInfoAction();

              // 打开首页
              this.loginAfterAction();
            }
            resolve(res);
          })
          .catch((err) => {
            Taro.hideLoading();
            Taro.showToast({ title: err.msg, icon: "none" });
            reject(err);
          });
      });
    },
    /**
     * 登录成功后的操作
     * @param res
     */
    async loginAction(res) {
      this.token = res.data.access_token;
      Taro.setStorageSync("token", res.data.access_token);
      this.userInfoAction();
      this.loginAfterAction();
    },
    /**
     * 获取用户信息，下拉刷新可能会用上
     * @param {*} ctx
     */
    userInfoAction() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((infoRes) => {
            // @ts-ignore
            const { user, userInfo, permissions } = infoRes;
            Object.assign(user, userInfo);
            this.userInfo = user;
            this.permissions = permissions;
            this.userType = user.userType;
            // 根据后端返回数据，当前登录人的当前角色，是roles中的第一个
            this.curRole = user.roleIds ? user.roleIds[0] : "";
            Taro.setStorageSync("userType", user.userType);
            resolve(infoRes);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    loginAfterAction() {
      const rpId = Taro.getStorageSync("isRpId");
      if (rpId) {
        Taro.reLaunch({
          url: "/pages-recruitment/pages/recruitment-detail/index?id=" + rpId,
        });
        Taro.removeStorage({
          key: "isRpId",
        });
      } else {
        Taro.reLaunch({
          url: "/pages/index/index",
        });
      }
    },
  },
});

// 业务页面
// const authStore = useAuthStore();
// authStore.$patch({ token: 'xxx' }); // 会写到 storage
