import { Router, Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import Spider from './utils/spider'
import Analyzer, { Content } from './utils/analyzer'
import { getResponseData } from './utils/util'
interface RequestWithBody extends Request {
    body: {
        [key: string]: string
    }
}
/**
 * 检查登录状态的中间件
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        next()
    } else {
        res.json(getResponseData(null, '请先登录'))
    }
}

const router = Router()
router.get('/', () => {
   
})

router.post('/login', (request: RequestWithBody, response: Response) => {
    let { password } = request.body
    const isLogin = request.session ? request.session.login : undefined
    if (isLogin) {
        response.json(getResponseData(false, '已经成功'))
    } else {
        if (password === '1234' && request.session) {
            request.session.login = true
            response.json(getResponseData(true))
        } else {
            response.json(getResponseData(false, '登录失败'))
        }
    }
})

router.get('/logout', (request: Request, response: Response) => {
    if (request.session) {
        request.session.login = undefined
    }
    response.json(getResponseData(true))
})

router.get('/getData', checkLogin, (request: RequestWithBody, response: Response) => {
    const url = 'https://hz.ke.com/ershoufang/'
    const analyze = Analyzer.getInstance()
    new Spider(url, analyze)
    response.json(getResponseData(true))
})

router.get('/showData', checkLogin, (request: RequestWithBody, response: Response) => {
    try {
        const filePath = path.resolve(__dirname, '../data/house.json')
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        response.json(getResponseData(fileContent))
    } catch (error) {
        response.json(getResponseData(false, '尚未获取过数据'))
    }
})

export default router