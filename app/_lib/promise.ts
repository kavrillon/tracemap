export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resolveWithMinDuration<T>(
  promises: Promise<T>[],
  ms: number,
): Promise<T[]> {
  const delayedPromise = async (promise: Promise<T>): Promise<T> => {
    const [result] = await Promise.all([promise, wait(ms)]);
    return result;
  };

  return Promise.all(promises.map(delayedPromise));
}
