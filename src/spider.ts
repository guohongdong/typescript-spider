import superagent from 'superagent'
import path from 'path'
import fs from 'fs'

export interface Analyzer {
    analyze: (html: string, filePath: string) => string
}
class Spider {
    constructor(private url: string, private analyze: Analyzer) {
        this.initSpiderProcess()
    }
    private filePath = path.resolve(__dirname, '../data/house.json')

    private async getRawHtml() {
        let result = await superagent.get(this.url)
        return result.text
    }
    private writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }
    private async initSpiderProcess() {
        const html = await this.getRawHtml()
        const fileContent = this.analyze.analyze(html, this.filePath)
        this.writeFile(fileContent)
    }
}

export default Spider
