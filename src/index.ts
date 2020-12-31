import superagent from 'superagent'

class Spider {
    private url = 'https://hz.ke.com/ershoufang/'
    async getRawHtml() {
        let result = await superagent.get(this.url)
        console.log(result.text)
    }
    constructor() {
        this.getRawHtml()
    }
}
const spider = new Spider()