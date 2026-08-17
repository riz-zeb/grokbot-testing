const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://localhost:8000');
  
  // Test 1: Pause functionality
  console.log('Testing pause functionality...');
  
  // Start the game
  await page.keyboard.press('Space');
  await page.waitForTimeout(100);
  
  // Press P to pause
  await page.keyboard.press('p');
  await page.waitForTimeout(100);
  
  // Take screenshot of paused state
  await page.screenshot({ path: '/tmp/pause1.png' });
  
  // Wait a few seconds
  await page.waitForTimeout(3000);
  
  // Take another screenshot to confirm frozen
  await page.screenshot({ path: '/tmp/pause2.png' });
  
  // Press P again to resume
  await page.keyboard.press('p');
  await page.waitForTimeout(500);
  
  console.log('Pause test screenshots saved to /tmp/pause1.png and /tmp/pause2.png');
  
  await browser.close();
})();
