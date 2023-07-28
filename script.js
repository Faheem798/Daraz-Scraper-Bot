import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    let items = [];

    const page = await browser.newPage();
    await page.goto(
      "https://www.daraz.pk/catalog/?from=filter&q=pet%20home&rating=4&ppath=30129:3736",
      {
        waitUntil: "domcontentloaded", // Wait until the DOM content is loaded
        timeout: 60000, // Increase the navigation timeout to 60 seconds
      }
    );

    const productHandles = await page.$$(".gridItem--Yd0sa");

    for (const productHandle of productHandles) {
      let title = await productHandle.$eval(
        "div.info--ifj7U > div.title--wFj93 > a",
        (el) => el.textContent
      );
      console.log("Title:", title.trim());

      let price = await productHandle.$eval(
        "div.info--ifj7U > div.price--NVB62 > span",
        (el) => el.textContent
      );
      console.log("Price:", price.trim());

      let img = await productHandle.$eval(
        "div.img--VQr82 > div > a > img",
        (el) => el.getAttribute("src")
      );
      console.log("Image:", img);

      items.push({ title, price, img });
      fs.appendFile('result.csv', `${title},${price},${img}\n`, (err) => {
        if (err) throw err;
      });
    }

    console.log("Total items:", items.length);

    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
