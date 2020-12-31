import superagent from 'superagent'
import cheerio from 'cheerio'

interface HouseInfo {
    title: string,
    follow: string
}
class Spider {
    private url = 'https://hz.ke.com/ershoufang/'
    getHouseInfo(html: string) {
        let houses: HouseInfo[] = []
        const $ = cheerio.load(html)
        $('li.clear').map((index, element) => {
            let title = $(element).find('a.maidian-detail').text().trim()
            let follow = $(element).find('div.followInfo').text().split('/')[0].trim()
            houses.push({
                title,
                follow
            })
        })
        return {
            time: new Date().getTime(),
            data: houses
        }
    }
    async getRawHtml() {
        let result = await superagent.get(this.url)
        this.getHouseInfo(result.text)
    }
    constructor() {
        this.getRawHtml()
    }
}
const spider = new Spider()