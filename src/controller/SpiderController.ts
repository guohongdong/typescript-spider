import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import { get, controller, use } from '../decorator'
import { getResponseData } from '../utils/util'
import Analyzer, { Content } from '../utils/analyzer'
import Spider from '../utils/spider'

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

/**
 * 打印日志中间件
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createLogger = (req: Request, res: Response, next: NextFunction) => {
   console.log(req.params,res.status,'createLogger')
   next()
}

@controller('/')
export class SpiderController {
    @get('/getData')
    @use(checkLogin)
    @use(createLogger)
    getData(request: Request, response: Response) {
        const url = 'https://hz.ke.com/ershoufang/'
        const analyze = Analyzer.getInstance()
        new Spider(url, analyze)
        response.json(getResponseData(true))
    }

    @get('/showData')
    @use(checkLogin)
    @use(createLogger)
    showData(request: Request, response: Response) {
        try {
            const filePath = path.resolve(__dirname, '../../data/house.json')
            let fileContent: Content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            response.json(getResponseData(fileContent))
        } catch (error) {
            response.json(getResponseData(false, '尚未获取过数据'))
        }
    }
}

