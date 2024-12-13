/**
 * 封装await
 * @param promise
 * @returns
 */
export async function awaitWrap(promise) {
  try {
    const res = await promise;
    return [res, null];
  } catch (err) {
    return [{}, err];
  }
}
