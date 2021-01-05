import 'reflect-metadata'
import router from '../router'
import { Method } from './request'
import { RequestHandler } from 'express'

export function controller(root: string) {
    return function (target: new (...args: any[]) => any) {
        for (let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key)
            const method: Method = Reflect.getMetadata('method', target.prototype, key)
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
            const handle = target.prototype[key]
            if (path && method) {
                const fullPath = root === '/' ? path : `${root}${path}`
                if (middlewares && middlewares.length) {
                    router[method](fullPath, ...middlewares, handle)
                } else {
                    router[method](fullPath, handle)
                }
            }
        }
    }
}
