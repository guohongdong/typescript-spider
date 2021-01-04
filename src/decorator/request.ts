import { LoginController, SpiderController } from '../controller'

export enum Method {
    get = "get",
    post = "post"
}

/**
 * 多种请求方法装饰器工厂函数
 *
 * @param {Method} type
 * @returns
 */
function getRequestDecorator(type: Method) {
    return function (path: string) {
        return function (target: LoginController | SpiderController, key: string) {
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', type, target, key)
        }
    }
}

export const get = getRequestDecorator(Method.get)
export const post = getRequestDecorator(Method.post)
