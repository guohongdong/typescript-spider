import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import Spider from './utils/spider'
import keAnalyzer, { Content, HouseInfo } from './utils/analyzer'
interface RequestWithBody extends Request {
    body: {
        [key: string]: string
    }
}

const router = Router()
router.get('/', (request: Request, response: Response) => {
    const isLogin = request.session ? request.session.login : undefined
    if (isLogin) {
        response.send(`
        <!DOCTYPE html>
        <html lang="zh">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>退出</title>
        </head>
        <body>
            <a href="/getData">获取数据</a>
            <a href="/showData">展示数据</a>
            <a href="/logout">退出</a>
        </body>
        </html>`)
    } else {
        response.send(`   
        <!DOCTYPE html>
        <html lang="zh">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>登录</title>
        </head>
        <body>
            <form method="POST" action="/login">
                <input type="password" name="password" autocomplete>
                <button type="submit">登录</button>
            </form>
        </body>
        </html>
    `)
    }
})

router.post('/login', (request: RequestWithBody, response: Response) => {
    let { password } = request.body
    const isLogin = request.session ? request.session.login : undefined
    if (isLogin) {
        response.send('已经成功')
    } else {
        if (password === '1234' && request.session) {
            request.session.login = true
            response.redirect('/')
        } else {
            response.send('登录失败')
        }
    }
})

router.get('/logout', (request: Request, response: Response) => {
    if (request.session) {
        request.session.login = undefined
    }
    response.redirect('/')
})

router.get('/getData', (request: RequestWithBody, response: Response) => {
    const isLogin = request.session ? request.session.login : undefined
    if (isLogin) {
        const url = 'https://hz.ke.com/ershoufang/'
        const analyze = keAnalyzer.getInstance()
        new Spider(url, analyze)
        response.send('获取数据成功')
    } else {
        response.send('请先登录')
    }
})

router.get('/showData', (request: RequestWithBody, response: Response) => {
    const isLogin = request.session ? request.session.login : undefined
    if (isLogin) {
        try {
            const filePath = path.resolve(__dirname, '../data/house.json')
            let fileContent: Content = {}
            if (fs.existsSync(filePath)) {
                fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            }
            response.json(fileContent)
        } catch (error) {
            response.send('尚未获取过数据')

        }
    } else {
        response.send('请先登录')
    }
})

export default router