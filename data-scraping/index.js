
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
      //lets us use findElementByText script

      //fill in username and password
      await page.waitFor('input[name=userid]');
      await page.$eval('input[name=userid]', el => el.value = 'LOPEZKEV');

      await page.waitFor('input[name=pwd]');
      await page.$eval('input[name=pwd]', el => el.value = 'iWTXeerB');

      await page.screenshot({ path: 'data-scraping/screenshots/1inputEntered.png', fullPage: true });

      //submit login request
      await page.click('input[type="submit"]');
      await page.screenshot({ path: 'data-scraping/screenshots/2loggedIn.png', fullPage: true });

      await page.waitFor(5000) // we need to wait for Twitter widget to load

      let scheduleFrame
      for (const frame of page.mainFrame().childFrames()) {
        // Here you can use few identifying methods like url(),name(),title()
        if (frame.url().includes('sheridan')) {
          await page.screenshot({ path: 'data-scraping/screenshots/3frameLoaded.png', fullPage: true });
          console.log('we found the sheridan iframe')
          scheduleFrame = frame
        }
      }

      //now go to the schedule frame
      const scheduleUrl = 'https://psoft-sa-students.sheridancollege.ca/psc/saprodlb/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL?Page=SSR_SS_WEEK&Action=A&ExactKeys=Y&EMPLID=991395035&TargetFrameName=None&PortalActualURL=https%3a%2f%2fpsoft-sa-students.sheridancollege.ca%2fpsc%2fsaprodlb%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL%3fPage%3dSSR_SS_WEEK%26Action%3dA%26ExactKeys%3dY%26EMPLID%3d991395035%26TargetFrameName%3dNone&PortalContentURL=https%3a%2f%2fpsoft-sa-students.sheridancollege.ca%2fpsc%2fsaprodlb%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL&PortalContentProvider=HRMS&PortalCRefLabel=My%20Weekly%20Schedule&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fpsoft-sa-students.sheridancollege.ca%2fpsp%2fsaprodlb%2f&PortalURI=https%3a%2f%2fpsoft-sa-students.sheridancollege.ca%2fpsc%2fsaprodlb%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes'
      await page.goto(scheduleUrl,{waitUntil: 'networkidle2'})
      await page.screenshot({ path: 'data-scraping/screenshots/4schedulePage.png', fullPage: true });

      browser.close();
      return resolve('Done!');
    } catch (e) {return reject(e);}
  })
}
run().then(console.log).catch(console.error);