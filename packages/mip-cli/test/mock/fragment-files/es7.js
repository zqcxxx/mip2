export function sleep (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export async function wait (time) {
  await sleep(time)
  console.log(`wait for ${time}s`)
}

export function spread (options) {
  const {
    a,
    b,
    ...c
  } = options
  console.log(a)
  console.log(b)
  console.log(c)
}

export default {
  sleep,
  wait,
  spread
}
