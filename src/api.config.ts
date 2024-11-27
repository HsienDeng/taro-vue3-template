// @ts-nocheck
const envVersion = __wxConfig.envVersion;

const apiConfig = {
  version: '1.0.0',
  baseUrl: 'http://192.168.0.38:9191',
};

if (envVersion === 'trial') {
  apiConfig.baseUrl = 'https://xy3-stage.ghcchina.cn/ctms-api';
} else if (envVersion === 'release') {
  apiConfig.baseUrl = 'https://xy3.ghcchina.cn/ctms-api';
}

export default apiConfig;
