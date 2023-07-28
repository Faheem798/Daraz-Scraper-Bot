import puppeteer from "puppeteer";

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.daraz.pk/catalog/?from=filter&q=pet%20home&rating=4&ppath=30129:3736');
    let title = "Null"
    let price = 'Null'
    let img = 'Null'
    const productsHandles = await page.$$('.ant-col-20.ant-col-push-4.side-right--Tyehf')
    for(const productsHandle of productsHandles){
      title = await page.evaluate((el)=> el.querySelector('div.info--ifj7U > div.title--wFj93 > a').textContent, productsHandle      )
      console.log(title)
      price = await page.evaluate((el)=> el.querySelector('div.info--ifj7U > div.price--NVB62 > span').textContent, productsHandle      )
      console.log(price)
      img = await page.evaluate((el)=> el.querySelector('div.img--VQr82 > div > a > img').getAttribute('src'), productsHandle      )
      console.log(img)

    }
    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
