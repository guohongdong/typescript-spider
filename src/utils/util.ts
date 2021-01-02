interface Result {
    success: boolean,
    msg?: string,
    data: any
}

/**
 * 格式化返回数据
 *
 * @param {*} data
 * @param {string} [msg]
 * @returns {Result}
 */
export const getResponseData = (data: any, msg?: string): Result => {
    if (msg) {
        return {
            success: false,
            msg,
            data
        }
    } else {
        return {
            success: true,
            data
        }
    }

}