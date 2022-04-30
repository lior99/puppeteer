const puppeteer = require('puppeteer');


(async () => {
    let browser;
    browser = await puppeteer.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
    const page = await browser.newPage();
    await page.goto('https://ynet.co.il');
    await page.waitForSelector('.WeatherViewInHeader');
    const weatherDiv = await page.$('.WeatherViewInHeader');
    console.log('weatherDiv', weatherDiv)

    const anchorLinkSelector = '.weathertempsdiv a span.weathertemps';
    const tempAnchorLink = await weatherDiv.$(anchorLinkSelector);
    const temp = await tempAnchorLink.evaluate(link => link.innerText);

    const cityElement = await page.$('#headerWeatherSelect a');
    const cityName = await cityElement.evaluate(item => item.innerText);

    console.log(`it's ${temp} at ${cityName}`);

    await browser.close();
})();