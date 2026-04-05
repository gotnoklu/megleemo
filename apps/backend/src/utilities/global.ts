import { Err, Ok, type Result } from '../libraries/result'

export function isObject<Value>(value: Value): value is Exclude<Extract<Value, Record<PropertyKey, any>>, unknown[]> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export const isPromise = <T>(value: unknown): value is Promise<T> => {
  return value instanceof Promise || (!!value && typeof (value as any).then === 'function')
}

/**
 * Safely executes a function that returns a Promise, or resolves a Promise,
 * and returns a Promise that resolves to a Result object.
 * The Result object will contain either the successfully resolved data or the error caught.
 *
 * @template Ok The type of the successful result.
 * @template Err The type of the error.
 * @param fn A function that returns a Promise of type Ok.
 * @returns A Promise that resolves to a Result object, containing either `data: Ok` or `error: Err`.
 */
export function safe<Ok, Err = unknown>(fn: () => Promise<Ok>): Promise<Result<Ok, Err>>
/**
 * Safely executes a synchronous function and returns a Result object.
 * The Result object will contain either the successfully returned data or the error caught.
 *
 * @template Ok The type of the successful result.
 * @template Err The type of the error.
 * @param fn A synchronous function that returns a value of type Ok.
 * @returns A Result object, containing either `data: Ok` or `error: Err`.
 */
export function safe<Ok, Err = unknown>(fn: () => Ok): Result<Ok, Err>
/**
 * Safely resolves a Promise and returns a Promise that resolves to a Result object.
 * The Result object will contain either the successfully resolved data or the error caught.
 *
 * @template Ok The type of the successful result.
 * @template Err The type of the error.
 * @param promise A Promise of type Ok.
 * @returns A Promise that resolves to a Result object, containing either `data: Ok` or `error: Err`.
 */
export function safe<Ok, Err = unknown>(promise: Promise<Ok>): Promise<Result<Ok, Err>>
export function safe<Ok, Err = unknown>(input: Promise<Ok> | (() => Ok) | (() => Promise<Ok>)): Result<Ok, Err> | Promise<Result<Ok, Err>> {
  if (typeof input === 'function') {
    try {
      const result = input()
      if (isPromise<Ok>(result)) {
        return safe(result)
      }
      return Ok(result)
    } catch (error) {
      return Err<Err>(error as Err)
    }
  } else {
    return input.then(
      (data): Result<Ok, Err> => Ok(data),
      (error): Result<Ok, Err> => Err(error)
    )
  }
}
