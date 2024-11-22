/**
 * 封装await
 * @param promise
 * @returns
 */
export async function awaitWrap<T, U = Error>(promise: Promise<T>): Promise<[T, null] | [T, U]> {
  try {
    const res: T = await promise;
    return [res, null];
  } catch (err) {
    return [{} as T, err as U];
  }
}
