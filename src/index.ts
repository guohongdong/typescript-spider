import express, { Request, Response, NextFunction } from 'express'
import router from './router'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)
app.use((req: Request, res: Response, next: NextFunction) => {
    req.nickName = 'dd'
    next()

})

app.listen(3000, () => {
    console.log('服务已启动')
})