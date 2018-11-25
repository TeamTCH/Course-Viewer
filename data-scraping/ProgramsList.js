const puppeteer = require('puppeteer')
const fs = require('fs')

function run() {
    return new Promise(async (resolve, reject) => {
        try {
            const url = 'https://academics.sheridancollege.ca/programs/'

            if(!url) {
                throw "Missing URL"
            }
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            // waits until network is idle
            await page.goto(url, {waitUntil: 'networkidle2'})
            // await page.setViewport({width: 1920, height: 1080})

            // await page.click('a[id=ember834]')
            // simulate click to see program list
            const [response] = await Promise.all([
                page.waitForNavigation({waitUntil: 'networkidle2'}),
                page.click('a[id=ember834]')
            ])
            // wait for everything to load
            await page.waitFor(5000)
            
            // find the data that we need 
            const data = await page.evaluate(() => {
                // create array of all list items
                const programs = Array.from(document.querySelectorAll('ul.list-group > li.list-group-item'))
                const obj = []
                // create array of objects that contains the link and name of the program
                for(let filter of programs) {
                    obj.push({
                        'link': filter.querySelector('a').getAttribute('href'),
                        'name': filter.textContent.trim()
                    })
                }
                return obj
            })
            console.log(data)

            // screenshot to make sure its the right page
            await page.screenshot({ path: './screenshots/ProgramList.png', fullPage: true })

            // end browser connection
            await browser.close();

            // temporarily write data onto a json file
            fs.writeFile('../ProgramList.json', JSON.stringify(data), err => {
                if(err) throw err
                console.log("saved")
            })
        }
        catch (e) {return reject(e);}
    })
}
run().then(console.log).catch(console.error);