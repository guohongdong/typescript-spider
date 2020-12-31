import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface HouseInfo {
    title: string,
    address: string,
    floor: string,
    size: string,
    direction: string,
    follow: number,
    time: string,
}

interface HouseResult {
    time: number,
    data: HouseInfo[]
}

export interface Content {
    [propName: number]: HouseInfo[];
}
class Spider {
    private url = 'https://hz.ke.com/ershoufang/'
    getHouseInfo(html: string): HouseResult {
        let houses: HouseInfo[] = []
        const $ = cheerio.load(html)
        $('li.clear').map((index, element) => {
            let title = $(element).find('a.maidian-detail').text().trim()
            let address = $(element).find('.positionInfo a').text().trim()
            let houseInfos = $(element).find('.houseInfo').text().split('|')
            let floor = houseInfos[0].trim().replace(/\s+/g, '')
            let size = houseInfos[1].trim()
            let direction = houseInfos[2].trim()
            let follow = +$(element).find('div.followInfo').text().split('/')[0].trim().split('人')[0]
            let time = $(element).find('div.followInfo').text().split('/')[1].trim()
            houses.push({
                title,
                address,
                floor,
                size,
                direction,
                follow,
                time
            })
        })
        return {
            time: new Date().getTime(),
            data: houses
        }
    }
    createJSONFile(houseInfo: HouseResult): Content {
        const filePath = path.resolve(__dirname, '../data/house.json')
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[houseInfo.time] = houseInfo.data
        return fileContent
    }
    async getRawHtml() {
        let result = await superagent.get(this.url)
        return result.text
    }
    async initSpiderProcess() {
        const filePath = path.resolve(__dirname, '../data/house.json')
        const html = await this.getRawHtml()
        const houses = this.getHouseInfo(html)
        const fileContent = this.createJSONFile(houses)
        fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }
    constructor() {
        this.initSpiderProcess()
    }
}
const spider = new Spider()