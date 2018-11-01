
const puppeteer = require('puppeteer');
const url = 'https://access.sheridaninstitute.ca/';
/*Make sure url exists. For now this doesn't matter but
it handles error checking regardless, just in case. */
if(!url){
  throw "Missing URL!";
}
async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url);
  await page.screenshot({ path: 'screenshots/accessSheridan.png' });
  
  browser.close();
}

run();