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
  await page.waitForTimeout(200);
  
  // Strategy: make a large clockwise circle multiple times to try to eat food and grow
  // Then make a tight turn to cause self-collision
  
  // Large circle pattern repeated
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1200);
    
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(1200);
    
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(1200);
    
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1200);
  }
  
  // Now try tight collision pattern
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(300);
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(300);
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(300);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  
  // Check for game over message
  try {
    const gameOverText = await page.$eval('#overlay-text', el => el.textContent);
    console.log('Game over message:', gameOverText);
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/collision_test.png' });
    console.log('Screenshot saved to /tmp/collision_test.png');
  } catch (e) {
    console.log('Could not read game over text, game might still be running');
    await page.screenshot({ path: '/tmp/collision_test.png' });
  }
  
  await browser.close();
})();
