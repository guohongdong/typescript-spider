import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import './controller/LoginController'
import { router } from './controller/decorator'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieSession({
    name: 'session',
    keys: ['isLogin'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(router)
app.use((req: Request, res: Response, next: NextFunction) => {
    req.nickName = 'dd'
    next()
})

app.listen(3000, () => {
    console.log('服务已启动')
})

