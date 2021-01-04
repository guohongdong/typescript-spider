import router from '../router'
import { Method } from './request'
import { RequestHandler } from 'express'

export function controller(root: string) {
    return function (target: new (...args: any[]) => any) {
        for (let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key)
            const method: Method = Reflect.getMetadata('method', target.prototype, key)
            const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
            const handle = target.prototype[key]
            if (path && method) {
                const fullPath = root === '/' ? path : `${root}${path}`
                if (middleware) {
                    router[method](path, middleware, handle)
                } else {
                    router[method](path, handle)
                }
            }
        }
    }
}
