import robot from "robotjs";
import fs from "fs";
import puppeteer from "puppeteer";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let lastPositionMouse = [];

async function getMousePosition(){
    while(true) {
        const mouse = robot.getMousePos();
        console.log(mouse);
        lastPositionMouse.push(mouse);
    
        if (lastPositionMouse.length >= 3) {
            if (lastPositionMouse[lastPositionMouse.length - 1].x === lastPositionMouse[lastPositionMouse.length - 2].x && lastPositionMouse[lastPositionMouse.length - 1].x === lastPositionMouse[lastPositionMouse.length - 3].x && lastPositionMouse[lastPositionMouse.length - 1].y === lastPositionMouse[lastPositionMouse.length - 2].y && lastPositionMouse[lastPositionMouse.length - 1].y === lastPositionMouse[lastPositionMouse.length - 3].y) {
                console.log(`script is stopped, mouse position: ${JSON.stringify(mouse)}`);
                break;
            }
        }
        await delay(1000);
    }
}

const browser = await puppeteer.launch({userDataDir: './cash', headless: false});
const page = await browser.newPage();

await page.goto("https://web.telegram.org/a/");
await page.waitForSelector("#LeftColumn-main > div.Transition > div > div.Transition > div > div:nth-child(2) > div:nth-child(2) > a > div.info > div.subtitle > div > button");
await page.click("#LeftColumn-main > div.Transition > div > div.Transition > div > div:nth-child(2) > div:nth-child(2) > a > div.info > div.subtitle > div > button");
await delay(9000);
await getMousePosition();
fs.writeFileSync("position_startButton.json", JSON.stringify(lastPositionMouse[lastPositionMouse.length - 1]));
await browser.close();