/**
 * 结果的基本接口
 */
export interface BasicResult {
  code: number;
  msg: string;
}

/**
 * 操作结果带数据的接口
 */
export interface ResultType<T> extends BasicResult {
  data: T;
}

/**
 * 分页结果带项目列表的接口
 */
export interface ResultTable<T> extends BasicResult {
  total: number;
  rows: T[];
}

/**
 * 结果的类型
 */
export type Result<T> = Promise<ResultType<T> & ResultTable<T>>;
