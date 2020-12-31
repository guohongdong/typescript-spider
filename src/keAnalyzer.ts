import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './index'

export interface HouseInfo {
    title: string,
    address: string,
    floor: string,
    size: string,
    direction: string,
    follow: number,
    time: string,
}

export interface HouseResult {
    time: number,
    data: HouseInfo[]
}

export interface Content {
    [propName: number]: HouseInfo[];
}

export default class KeAnalyzer implements Analyzer {
    private static instance: KeAnalyzer
    private constructor() {
    }
    static getInstance() {
        if (!KeAnalyzer.instance) {
            KeAnalyzer.instance = new KeAnalyzer()
        }
        return KeAnalyzer.instance
    }
    getJSONInfos(houseInfo: HouseResult, filePath: string): Content {
        let fileContent: Content = {}
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[houseInfo.time] = houseInfo.data
        return fileContent
    }
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
    public analyze(html: string, filePath: string) {
        const houses = this.getHouseInfo(html)
        const fileContent = this.getJSONInfos(houses, filePath)
        return JSON.stringify(fileContent)
    }

}