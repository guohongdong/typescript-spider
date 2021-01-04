import { RequestHandler } from 'express'
import { LoginController, SpiderController } from '../controller'

/**
 * 中间件装饰器
 *
 * @export
 * @param {RequestHandler} middleware
 * @returns
 */
export function use(middleware: RequestHandler) {
    return function (target: LoginController | SpiderController, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key)
    }
}
