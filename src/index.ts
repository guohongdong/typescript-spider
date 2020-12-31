import superagent from 'superagent'
import path from 'path'
import fs from 'fs'
import keAnalyzer from './keAnalyzer'

export interface Analyzer {
    analyze: (html: string, filePath: string) => string
}
class Spider {
    private filePath = path.resolve(__dirname, '../data/house.json')

    async getRawHtml() {
        let result = await superagent.get(url)
        return result.text
    }
    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }
    async initSpiderProcess() {
        const html = await this.getRawHtml()
        const fileContent = this.analyze.analyze(html, this.filePath)
        this.writeFile(fileContent)
    }
    constructor(private url: string, private analyze: Analyzer) {
        this.initSpiderProcess()
    }
}
const url = 'https://hz.ke.com/ershoufang/'
const analyze = new keAnalyzer()
const spider = new Spider(url, analyze)