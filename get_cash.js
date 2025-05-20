import puppeteer from 'puppeteer';

async function puppeteerStart() {
    const browser = await puppeteer.launch({userDataDir: './cash', headless: false});
    const page = await browser.newPage();
    page.goto("https://web.telegram.org/a/");
    
    setTimeout(() => {
        browser.close();
    }, 60000);
}

puppeteerStart();