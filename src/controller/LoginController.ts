import { Request, Response } from 'express'
import  'reflect-metadata'
import { get, controller } from './decorator'

@controller
class LoginController {
    @get('/')
    home(request: Request, response: Response){
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