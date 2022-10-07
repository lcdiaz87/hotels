module.exports = class Page {
  
  async open(path) {    
    await browser.maximizeWindow();
    return await browser.url(`${path}`);
  }
};
