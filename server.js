const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.get('/scrape', async (req, res) => {
  const { url } = req.query; // Passar a URL como query parameter
    if (!url) {
    return res.status(400).json({ error: 'URL is required' });
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const content = await page.content();
    await browser.close();
    
    res.json({ content });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
