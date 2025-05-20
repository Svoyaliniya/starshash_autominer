// importing required libraries
import robot from "robotjs";
import puppeteer from "puppeteer";
import fs from "fs";

// important variables
const max_energy = 11700;

// delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// main code
while(true){
    try {
        const browser = await puppeteer.launch({userDataDir: './cash', headless: false}); // true
        const page = await browser.newPage();

        await page.goto("https://web.telegram.org/a/");
        await page.waitForSelector("#LeftColumn-main > div.Transition > div > div.Transition > div > div:nth-child(2) > div:nth-child(2) > a > div.info > div.subtitle > div > button");
        await page.click("#LeftColumn-main > div.Transition > div > div.Transition > div > div:nth-child(2) > div:nth-child(2) > a > div.info > div.subtitle > div > button");

        const mousePosition = JSON.parse(fs.readFileSync("position_startButton.json", "utf8"));
        await delay(9000);
        const x = mousePosition.x;
        const y = mousePosition.y;
        console.log(x, y);

        robot.moveMouse(x, y);
        console.log('Mouse moved');
        setTimeout(() => {
            robot.mouseClick();
        }, 100);

        await delay(900000);
        await browser.close();
        delay(max_energy * 1000);
    } catch (error) {
        console.log(error);
    }
}