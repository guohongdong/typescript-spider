import 'reflect-metadata'
import { Request, Response } from 'express'
import { get, controller, post } from './decorator'
import { getResponseData } from '../utils/util'
@controller
class LoginController {
    @post('/login')
    login(request: Request, response: Response) {
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
    }


    @get('/logout')
    logout(request: Request, response: Response) {
        if (request.session) {
            request.session.login = undefined
        }
        response.json(getResponseData(true))
    }

    @get('/')
    home(request: Request, response: Response) {
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
    }
}