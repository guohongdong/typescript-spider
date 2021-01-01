import { Router, Request, Response } from 'express'
import Spider from './spider'
import keAnalyzer from './keAnalyzer'

const router = Router()
router.get('/', (request: Request, response: Response) => {
    const url = 'https://hz.ke.com/ershoufang/'
    const analyze = keAnalyzer.getInstance()
    new Spider(url, analyze)
    response.send('获取数据成功')
})

export default router