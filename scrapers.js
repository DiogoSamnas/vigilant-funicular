const puppeteer = require('puppeteer');

async function scrapeNotice(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const image = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="price_inside_buybox"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({image , title , price});

    browser.close();
}

scrapeNotice('https://www.amazon.com.br/dp/B07ZZW745X?pf_rd_r=JA8A37CADR4CEYAT18W2&pf_rd_p=e2b17ad7-fe98-446a-80c4-4fea5dfe15a7');