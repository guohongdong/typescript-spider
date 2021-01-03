export function controller(target: any) {
    for (let key in target.prototype) {
        Reflect.defineMetadata('path', target, key)
    }

}

export function get(path: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key)
    }
}