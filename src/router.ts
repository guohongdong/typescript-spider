import { Router, Request, Response } from 'express'
import Spider from './spider'
import keAnalyzer from './keAnalyzer'

interface RequestWithBody extends Request{
    body:{
        [key:string]:string
    }
}
const router = Router()
router.get('/', (request: Request, response: Response) => {
    response.send(`   
        <html>
        <body>
            <form method="POST" action="/getData">
            <input type="password" name="password">
            <button type="submit">提交</button>
            </form>
        </body>
        </html>
    `)

})

router.post('/getData', (request: RequestWithBody, response: Response) => {
    let { password } = request.body 
    if (password === '111') {
        const url = 'https://hz.ke.com/ershoufang/'
        const analyze = keAnalyzer.getInstance()
        new Spider(url, analyze)
        response.send('获取数据成功')
    } else {
        response.send('获取数据失败')
    }
})

export default router