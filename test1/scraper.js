const puppeteer = require('puppeteer');

async function autoScroll(page) {
	await (
		await page
	).evaluate(async () => {
		await new Promise((resolve, reject) => {
			var totalHeight = 0;
			var distance = 100;
			var timer = setInterval(() => {
				var scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if (totalHeight >= scrollHeight - window.innerHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 50);
		});
	});
}

const scraperImages = async () => {
	try {
		const url = 'https://www.amazon.co.uk/dp/';
		const asin = 'B081S22ZYK';
		const browser = await puppeteer
			.launch({
				headless: false,
				args: ['--start-maximized'],
				defaultViewport: null,
			})
			.then(async (browser) => {
				const page = browser.newPage();
				await (await page).setViewport({ width: 1400, height: 944 });
				await (await page).goto(url + asin);
				await (await page).waitForSelector('#sp-cc');
				await (await page).click('#sp-cc-accept');
				// await (
				// 	await page
				// ).screenshot({ path: '/Users/hassan/Downloads/screen.png' });

				const imgs = await (
					await page
				).$$eval('.item.imageThumbnail img', (imgs) =>
					imgs.map((img) => img.getAttribute('src'))
				);
				console.log(imgs);
				browser.close();
			});
	} catch (error) {
		console.log(error);
	}
};

const scraperProducts = async () => {
	try {
		const base_url = 'https://www.amazon.co.uk';
		const extension = '/bestsellers';
		const browser = await puppeteer
			.launch({
				headless: false,
				args: ['--start-maximized'],
				defaultViewport: null,
			})
			.then(async (browser) => {
				const page = browser.newPage();
				await (await page).setViewport({ width: 1400, height: 944 });
				await (await page).goto(base_url + extension);
				await (await page).waitForSelector('#sp-cc');
				await (await page).click('#sp-cc-accept');

				let categoryList = await (
					await page
				).$$eval('div[role="treeitem"] a', (elements) =>
					elements.map((el) => el.getAttribute('href'))
				);
				categoryList = categoryList.filter((el) => !el.includes('Digital'));

				console.log(categoryList);

				const productDataBase = [];

				for (url of categoryList) {
					await (await page).goto(base_url + url);

					await (await page).waitForSelector('#gridItemRoot');

					await autoScroll(page);

					const categoryTitle = await (
						await page
					).$eval('div[role="treeitem"] span', (element) => element.innerText);
					console.log(categoryTitle);

					let obj = {};
					let productPageData = [];

					const productTiles = await (await page).$$('#gridItemRoot');
					for (tile of productTiles) {
						if ((await tile.$('.zg-item-unavl-ctr')) === null) {
							const title = await tile.$eval(
								'.a-link-normal span div',
								(el) => el.textContent
							);
							const imageUrl =
								base_url +
								(await tile.$eval('.a-link-normal', (element) =>
									element.getAttribute('href')
								));
							const asin = await tile.$eval(
								'.zg-grid-general-faceout div',
								(element) => element.getAttribute('id')
							);

							productPageData.push({ title, imageUrl, asin });
						}
					}
					obj[categoryTitle] = productPageData;
					productDataBase.push(obj);
					console.log(productDataBase);
				}

				browser.close();
			});
	} catch (error) {
		console.log(error);
	}
};

scraperProducts();
