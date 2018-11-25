const puppeteer = require('puppeteer')
const fs = require('fs')
const programList = require('../ProgramList.json')

function run() {
    return new Promise(async (resolve, reject) => {
        try{
            const url = 'https://academics.sheridancollege.ca'

            if(!url) {
                throw "Missing URL"
            }
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({width: 1000, height: 789})
            // for(let program of programList) {
            //     console.log(program.link);
            // }
            // waits until network is idle
            console.log(programList[1].link)
            await page.goto(url+programList[1].link, {waitUntil: 'networkidle2'})

            await page.screenshot({path: './screenshots/SampleProgram.png', fullPage: true})

            // const data = await page.$eval('div.row > div.col-sm-9', el => el.textContent)
            const data = await page.evaluate(() => {
                const obj = []
                obj.push({
                    "title": document.querySelector('div.row > div.col-sm-9 h3').innerHTML,
                    "desc": document.querySelector('div.row > div.col-sm-9 p').innerHTML
                })
                // const info = Array.from(document.querySelectorAll('div.row > div.col-sm-9 h3 + p'))
                return obj
            })

            console.log(data[0])

            const [response] = await Promise.all([
                page.waitForNavigation({waitUntil: 'networkidle2'}),
                page.click(`a[href='${programList[1].link}/courses']`)
            ])

            await page.screenshot({path: './screenshots/SampleCourse.png', fullPage: true})            

            console.log(data[0])

            await browser.close()
        } catch(e) {
            return reject(e)
        }
    })
}
run().then(console.log).catch(console.error);