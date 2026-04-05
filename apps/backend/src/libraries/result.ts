class OkResult<T, E = never> {
  #data: T

  constructor(data: T) {
    this.#data = data
  }

  get data() {
    return this.#data
  }

  isOk(): this is OkResult<T, E> {
    return true
  }

  isErr(): this is ErrResult<T, E> {
    return false
  }
}

class ErrResult<T, E> {
  #error: E

  constructor(error: E) {
    this.#error = error
  }

  get error() {
    return this.#error
  }

  isOk(): this is OkResult<T, E> {
    return false
  }

  isErr(): this is ErrResult<T, E> {
    return true
  }
}

export function Ok<T>(value: T) {
  return new OkResult(value)
}

export function Err<E>(error: E) {
  return new ErrResult(error)
}

export type Result<T, E> = OkResult<T, E> | ErrResult<T, E>
