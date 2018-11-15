
const puppeteer = require('puppeteer');
/*Make sure url exists. For now this doesn't matter but
it handles error checking regardless, just in case. */
function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = 'https://access.sheridaninstitute.ca/';
      if (!url) {
        throw "Missing URL!";
      }
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      //go to page and wait till the network is idle
      await page.goto(url,{waitUntil: 'networkidle2'});
      //fill in username and password
      await page.waitFor('input[name=IDToken1]');
      await page.$eval('input[name=IDToken1]', el => el.value = 'lopezkev');

      await page.waitFor('input[name=IDToken2]');
      await page.$eval('input[name=IDToken2]', el => el.value = 'iWTXeerB');

      await page.screenshot({ path: 'screenshots/inputEntered.png', fullPage: true });

      //submit login request
      await page.click('input[type="submit"]');
      await page.screenshot({ path: 'screenshots/loggedIn.png', fullPage: true });

      browser.close();
      return resolve('Success!');
    } catch (e) {
      return reject(e);
    }
  })
}
run().then(console.log).catch(console.error);