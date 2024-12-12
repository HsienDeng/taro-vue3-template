<script setup lang="ts">
  import { IconFont } from '@nutui/icons-vue-taro';

  import { ref } from 'vue';

  const value = ref('');
  const root = ref();
</script>

<template>
  <div class="contain">
    <nut-sticky>
      <nut-searchbar
        v-model="value"
        shape="round"
        background="#1658ba"
        placeholder="请输入项目名称搜索"
      />
    </nut-sticky>

    <div class="contain-card" ref="root">
      <div class="card-bg">
        <div class="card-flex" style="line-height: 40px">
          <div class="card-title">
            <div class="title-tip"></div>
            <div>注册类药物临床试验</div>
          </div>
          <div><IconFont name="arrow" /></div>
        </div>
        <div>LP-108在复发或难治B细胞淋巴瘤患者中的I期临床研究</div>
        <div class="card-flex">
          <span>
            <span>流水号:</span>
            <span>20240034</span>
          </span>
          <span>
            <span>PI:</span>
            <span>张三</span>
          </span>
        </div>
        <div class="card-flex">
          <span>
            <span>提交时间:</span>
            <span>20240034</span>
          </span>
          <span>
            <span>专业:</span>
            <span>心内科</span>
          </span>
          <nut-button type="primary" size="small" @click="handleCheck('projectApproval')">
            立项审查
          </nut-button>
        </div>
      </div>
      <div class="card-bg">
        <div class="card-flex" style="line-height: 40px">
          <div class="card-title">
            <div class="title-tip"></div>
            <div>注册类药物临床试验</div>
          </div>
          <div><IconFont name="arrow" /></div>
        </div>
        <div>LP-108在复发或难治B细胞淋巴瘤患者中的I期临床研究</div>
        <div class="card-flex">
          <span>
            <span>流水号:</span>
            <span>20240034</span>
          </span>
          <span>
            <span>PI:</span>
            <span>张三</span>
          </span>
        </div>
        <div class="card-flex">
          <span>
            <span>提交时间:</span>
            <span>20240034</span>
          </span>
          <span>
            <span>专业:</span>
            <span>心内科</span>
          </span>
          <nut-button type="primary" size="small" disabled>立项审查</nut-button>
        </div>
      </div>
      <div class="card-bg">
        <div class="card-flex" style="line-height: 40px">
          <div class="card-title">
            <div class="title-tip"></div>
            <div>注册类药物临床试验</div>
          </div>
          <div><IconFont name="arrow" /></div>
        </div>
        <div>LP-108在复发或难治B细胞淋巴瘤患者中的I期临床研究</div>
        <div class="card-flex">
          <span>
            <span>流水号:</span>
            <span>20240034</span>
          </span>
          <span>
            <span>PI:</span>
            <span>张三</span>
          </span>
        </div>
        <div class="card-flex">
          <span>
            <span>提交时间:</span>
            <span>20240034</span>
          </span>
          <span>
            <span>专业:</span>
            <span>心内科</span>
          </span>
          <nut-button color="#9797e3" size="small" @click="handleCheck('projectStartProcessing')">
            启动质控
          </nut-button>
        </div>
      </div>
    </div>
    <!--    底部任务台-->
    <nut-sticky position="bottom" class="footer-bg" />
    <!--    切换角色-悬浮-->
  </div>
</template>

<style scoped lang="less">
  .contain {
    height: 100%;
    background-color: #edeff6;
  }
  .contain-card {
    .card-bg {
      background-color: white;
      margin: 0 0 10px 0;
      padding: 0 10px 10px 10px;
    }
    .card-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-title {
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    .title-tip {
      background-color: cornflowerblue;
      width: 5px;
      height: 16px;
      margin-right: 10px;
    }
  }
  .footer-bg {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
  }
  .bottom .nut-col--6 {
    flex: 0 0 25%;
    max-width: 25%;
    text-align: center;
  }
</style>
