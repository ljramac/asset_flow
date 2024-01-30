export const rejectIn = (ms, error) => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error(error)), ms)
  })
}
