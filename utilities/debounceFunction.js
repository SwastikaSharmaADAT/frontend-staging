/**
 * Method which returns a debounced version of a given function, which will be called after the given waiting
 * duration has elapsed
 */
 export function debounceFunction(callback, time) {
    let timeout
    return function (...args) {
      const context = this
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
        callback.apply(context, args)
      }, time)
    }
  }
  