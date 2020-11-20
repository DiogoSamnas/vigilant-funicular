const puppeteer = require('puppeteer');
const fs = require('fs');
const { error } = require('console');

async function scrapeNotice(url) {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path:'instagram.png'});

    const imgList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img');

        const imgArray = [...nodeList];

        const imgList = imgArray.map(img => ({src : img.src}));

        return imgList
    });

    fs.writeFile('instagram.json', JSON.stringify(imgList,null,2), err =>{
        if(err) throw new Error('Something went wrong')

        console.log('Well done!')
    });

    await browser.close();
}

scrapeNotice('https://www.instagram.com/therock/');