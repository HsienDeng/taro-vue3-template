import { http } from '@/utils/http';

/**
 * 根据dictType查询字典详情
 * @param dictType
 */
export function getDictDataList(dictType) {
  return http.get('/system/dict/data/type/' + dictType);
}
