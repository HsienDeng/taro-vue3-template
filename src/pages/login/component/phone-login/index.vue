<template>
  <NutSpace v-if="bolShow" direction="vertical" fill gutter="40rpx" className="action">
    <nut-form ref="formRef" :model-value="formData" :rules="formRules">
      <nut-form-item prop="phone">
        <nut-input
          v-model="formData.phone"
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
      <nut-form-item prop="Ghie">
        <nut-input
          v-model="formData.Ghie"
          placeholder="请输入图形验证码"
          :max-length="11"
          type="number"
        >
          <template #left>
            <IconFont font-class-name="iconfont" size="20px" class-prefix="icon" name="security" />
          </template>
          <template #right>
            <img :src="imgCodeUrl" alt="图形验证码" class="login-code-img" @click="getGhieCode" />
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item prop="code">
        <nut-input v-model="formData.code" placeholder="请输入短信验证码" type="number">
          <template #left>
            <IconFont font-class-name="iconfont" size="20px" class-prefix="icon" name="email" />
          </template>
          <template #right>
            <nut-button
              :disabled="codeCountDown !== 60"
              :loading="codeBtnLoading"
              type="primary"
              :shape="true"
              size="small"
              @click="handleSmsCodeClick"
            >
              {{ codeText }}
            </nut-button>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item />
    </nut-form>
    <NutButton :loading="codeBtnLoading" type="primary" block size="large" @click="onSubmitClick">
      登录
    </NutButton>
  </NutSpace>
</template>

<script setup>
  import Taro from '@tarojs/taro';
  import { ref, computed, reactive } from 'vue';

  import { LoginAction, useLoginAction } from '../../hooks/useLogin';
  import { getImageCode, sendSmsCode } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';

  const formRef = ref();
  const userStore = useUserStore();
  /**
   * 表单数据
   */
  const formData = ref({
    phone: '',
    code: '',
    Ghie: '',
    uuid: '',
    grant_type: 'sms',
  });
  const formRules = reactive({
    phone: [
      { required: true, message: '请填写手机号' },
      { required: true, regex: /^1[0-9]\d{9}$/, message: '请填写正确的手机号码' },
    ],
    Ghie: [{ required: true, message: '请填写图形验证码' }],
    code: [{ required: true, message: '请填写短信验证码' }],
  });
  const codeText = ref('获取验证码');
  const codeCountDown = ref(60);
  const imgCodeUrl = ref('');
  const codeBtnLoading = ref(false);

  /**
   * use toggle login action
   */
  const { action } = useLoginAction();
  const bolShow = computed(() => {
    return action.value === LoginAction.PHONE;
  });

  /**
   * 登录
   */
  function onSubmitClick() {
    if (!formData.value.uuid) {
      Taro.showToast({
        title: '请先获取验证码',
        icon: 'error',
      });
      return false;
    }
    formRef.value?.validate().then(({ valid }) => {
      if (!valid) {
        return;
      }
      codeBtnLoading.value = true;
      userStore.login(formData.value).catch(() => {
        getGhieCode();
        codeBtnLoading.value = false;
      });
    });
  }

  const handleSmsCodeClick = () => {
    formRef.value?.validate('phone').then(({ valid }) => {
      if (!valid) return valid;
      codeBtnLoading.value = true;
      const { phone, Ghie, uuid } = formData.value;
      sendSmsCode({
        phone,
        Ghie,
        uuid,
        smsTemplte: 'sms_login',
      })
        .then((_) => {
          codeBtnLoading.value = false;
          const getCodeInterval = setInterval((_) => {
            codeCountDown.value--;
            codeText.value = `${codeCountDown.value}S后可重新获取`;
            if (codeCountDown.value === 0) {
              clearInterval(getCodeInterval);
              codeCountDown.value = 60;
              codeText.value = '获取验证码';
            }
          }, 1000);
        })
        .catch((err) => {
          getGhieCode();
          codeBtnLoading.value = false;
          console.log(err);
        });
    });
  };

  // 获取图形验证码
  const getGhieCode = () => {
    getImageCode().then((res) => {
      imgCodeUrl.value = `data:image/gif;base64,${res.img}`;
      formData.value.uuid = res.uuid;
    });
  };

  getGhieCode();
</script>
