import express from 'express'
import router from './router'

const app = express()

app.use(router)

app.listen(3001,()=>{
    console.log('服务已启动')
})