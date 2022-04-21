const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');
let myBrowser
let page1
let downloadPage
const chromiumPath = path.join('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe');

async function main() {
    // 启动chrome浏览器
    myBrowser = await puppeteer.launch({
        // 指定该浏览器的路径
        executablePath: chromiumPath,
        // 是否为无头浏览器模式，默认为无头浏览器模式
        headless: false
    });
    page1 = await myBrowser.newPage();
    downloadPage = await myBrowser.newPage();
    // 空白页刚问该指定网址
    await page1.goto('https://www.baidu.com').catch(() => { });
    await downloadPage.goto('chrome://downloads/').catch(() => { });
    // await page1.screenshot({ path: 'screenshot.png' });

}
async function downloadshot() {
    await downloadPage.screenshot({ path: 'downloadPage.png' });
    // const inputElement = await downloadPage.$('#description');
    // 将html保存到一个文件中
    const html = await downloadPage.content();
    fs.writeFile('page.html', html, _ => console.log('HTML saved'));


}
async function newDownload(url) {
    await page1.goto(url).catch(() => { });
    setTimeout(() => {
        page1.evaluate(() => {
            const titleDom = document.querySelector('div#down_link>a').click();
            console.log(titleDom);
        });
    }, 70000)
    setTimeout(() => {
        page1.evaluate(() => {
            const arr = document.querySelectorAll('div#addr_list>a')
            console.log(arr);
            arr[3].click()
        });
    }, 80000)
}
module.exports = { main, downloadshot, newDownload }


