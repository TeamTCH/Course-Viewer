
const puppeteer = require('puppeteer');

function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = 'https://psoft-sa-students.sheridancollege.ca/psp/saprodlb/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder';
      /*Make sure url exists. For now this doesn't matter but
      it handles error checking regardless, just in case. */
      if (!url) {
        throw "Missing URL!";
      }
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      //go to page and wait till the network is idle
      await page.goto(url, { waitUntil: 'networkidle2' });
      //fill in username and password
      await page.waitFor('input[name=userid]');
      await page.$eval('input[name=userid]', el => el.value = 'LOPEZKEV');

      await page.waitFor('input[name=pwd]');
      await page.$eval('input[name=pwd]', el => el.value = 'iWTXeerB');

      await page.screenshot({ path: 'screenshots/inputEntered.png', fullPage: true });

      //submit login request
      await page.click('input[type="submit"]');
      await page.screenshot({ path: 'screenshots/loggedIn.png', fullPage: true });

      await page.waitFor(5000) // we need to wait for Twitter widget to load

      let scheduleFrame
      for (const frame of page.mainFrame().childFrames()) {
        // Here you can use few identifying methods like url(),name(),title()
        if (frame.url().includes('sheridan')) {
          await page.screenshot({ path: 'screenshots/frameLoaded.png', fullPage: true });
          console.log('we found the sheridan iframe')
          scheduleFrame = frame
        }
      }

      //await clickByText(page,'Weekly Schedule')
      //scrape all contents on the page that's in a table, including the html
      const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td'))
        return tds.map(td => td.innerHTML)
      });
      console.log(data);

      browser.close();
      return resolve('Done!');
    } catch (e) {return reject(e);}
  })
}
run().then(console.log).catch(console.error);