<template>
  <div v-if="bolShow" class="password-action__login">
    <nut-form ref="formRef" :model-value="formData" :rules="formRules">
      <nut-form-item prop="username">
        <nut-input
          v-model="formData.username"
          placeholder="请输入手机号码"
          :max-length="11"
          type="number"
        >
          <template #left>
            <IconFont
              font-class-name="iconfont"
              size="20px"
              class-prefix="icon"
              name="mobile-phone"
            />
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item prop="password">
        <nut-input v-model="formData.password" placeholder="请输入密码" type="password">
          <template #left>
            <IconFont font-class-name="iconfont" size="20px" class-prefix="icon" name="security" />
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item>
        <div class="remenber">
          <nut-checkbox v-model="remenber"> 记住密码 </nut-checkbox>
          <view class="update-pwd"> 忘记密码 </view>
        </div>
      </nut-form-item>
    </nut-form>
    <NutButton type="primary" block size="large" :loading="pageLoading" @click="onSubmitClick">
      登录
    </NutButton>
  </div>
  <div v-if="bolShow" class="footer end">
    <view
      class="to-login"
      @click="toggleLogin(bolShow ? LoginAction.WECHAT : LoginAction.PASSWORD)"
    >
      快捷登录
    </view>
  </div>
  <div v-else :class="['footer', action !== LoginAction.WECHAT ? 'space' : 'end']">
    <view
      v-if="action !== LoginAction.WECHAT"
      class="to-login"
      @click="toggleLogin(LoginAction.WECHAT)"
    >
      快捷登录
    </view>
    <view class="to-login" @click="toggleLogin(LoginAction.PASSWORD)"> 密码登录 </view>
  </div>
</template>

<script setup>
  import { computed, reactive, ref, onMounted } from 'vue';
  import { LoginAction, useLoginAction } from '@/pages/login/hooks/useLogin';
  import Taro from '@tarojs/taro';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();

  /**
   * use toggle login action
   */
  const { action, toggleLogin } = useLoginAction();
  const bolShow = computed(() => {
    return action.value === LoginAction.PASSWORD;
  });

  /**
   * 表单数据
   */
  const formRef = ref();
  const formData = ref({
    username: '',
    password: '',
  });
  const formRules = reactive({
    username: [{ required: true, message: '请填写手机号' }],
    password: [{ required: true, message: '请输入密码' }],
  });
  const remenber = ref(false);
  const pageLoading = ref(false);

  // 记住密码
  function rementberPwd() {
    if (remenber.value) {
      let rememberData = {
        username: formData.value.username,
        password: formData.value.password,
      };
      Taro.setStorageSync('remember', rememberData);
    } else {
      Taro.removeStorageSync('remember');
    }
  }

  /**
   * 登录按钮点击
   */
  function onSubmitClick() {
    formRef.value?.validate().then(({ valid, errors }) => {
      if (valid) {
        rementberPwd();
        submitLogin();
      } else {
        console.warn('error:', errors);
      }
    });
  }

  /**
   * 提交登录
   */
  function submitLogin() {
    pageLoading.value = true;
    userStore.pwdLoginAction(formData.value).catch((_) => {
      pageLoading.value = false;
    });
  }

  onMounted(() => {
    let rememberData = Taro.getStorageSync('remember');
    if (rememberData) {
      formData.value.username = rememberData.username;
      formData.value.password = rememberData.password;
      remenber.value = true;
    }
  });
</script>

<style lang="scss">
  .password-action__login {
    .nut-checkbox__label {
      margin-left: 10px !important;
    }
    .remenber {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .update-pwd {
        font-size: var(--nut-checkbox-label-font-size, 28rpx);
        color: $primary-color;
      }
    }
  }
</style>
