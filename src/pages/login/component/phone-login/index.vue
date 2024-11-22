<template>
  <NutSpace v-if="bolShow" direction="vertical" fill gutter="40rpx" className="action">
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
      <nut-form-item prop="code">
        <nut-input v-model="formData.code" :max-length="4" placeholder="请输入验证码" type="number">
          <template #left>
            <IconFont font-class-name="iconfont" size="20px" class-prefix="icon" name="security" />
          </template>
          <template #right>
            <nut-button type="primary" shape size="small">获取验证码</nut-button>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item />
    </nut-form>
    <NutButton type="primary" shape="square" block size="large" @click="onSubmitClick">
      登录
    </NutButton>
  </NutSpace>
</template>

<script setup lang="ts">
  import { ref, computed, reactive } from 'vue';
  import { LoginAction, useLoginAction } from '../../hooks/useLogin';

  const formRef = ref();
  /**
   * 表单数据
   */
  const formData = ref({
    username: '',
    code: '',
  });
  const formRules = reactive({
    username: [{ required: true, message: '请填写手机号' }],
    code: [{ required: true, message: '请填写验证码' }],
  });

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
    formRef.value?.validate().then(({ valid, errors }) => {
      if (valid) {
        console.log('success:', formData.value);
      } else {
        console.warn('error:', errors);
      }
    });
  }
</script>

<style scoped></style>
