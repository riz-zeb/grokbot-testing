const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://localhost:8000');
  
  console.log('Starting self-collision test...');
  
  // Start the game
  await page.keyboard.press('Space');
  await page.waitForTimeout(300);
  
  // Move down to avoid immediate wall collision
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(600);
  
  // Move left
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(600);
  
  // Move up
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(600);
  
  // Move right - this should cause self-collision if snake is long enough
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  
  // Check for game over message
  const gameOverText = await page.$eval('#overlay-text', el => el.textContent);
  console.log('Game over message:', gameOverText);
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/collision_test.png' });
  console.log('Screenshot saved to /tmp/collision_test.png');
  
  await browser.close();
})();
