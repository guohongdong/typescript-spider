import 'reflect-metadata'
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
        let middlewares: RequestHandler[] =  Reflect.getMetadata('middlewares', target, key) || []
        middlewares.push(middleware)
        Reflect.defineMetadata('middlewares', middlewares, target, key)
    }
}
