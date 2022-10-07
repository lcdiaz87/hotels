const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EuroStartsHotelsPage extends Page {
  table = [];
  get acceptCookies() {
    return $('.fn-confirm');
  }
  //#region search

  get panelSearch() {
    return $(".c0078");
  }

  //#region destination
  get destinationInputSearch(){
    return $("#searchBoxEngine");
  }  
  async chooseCityDestination(city){
    await this.destinationInputSearch.setValue(city);
    await (await this.panelSearch).waitForDisplayed();
    let destination = await this.panelSearch.$('.c00370');
    await destination.waitForClickable();
    await destination.click();
  }
  //#endregion

  //#region calendar
  get rightArrowCalendar() {
    return $('.c00389 .c00388');
  }
  async chooseDecemberDate(startDay, endDay){
    await (await this.rightArrowCalendar).waitForClickable();
    await (await this.rightArrowCalendar).click();
    let decemberMonth = await (await this.panelSearch).$('.c00392=December 2022');
    decemberMonth = await decemberMonth.parentElement();
    let start = await decemberMonth.$('.c00397='+startDay);
    await start.click();
    let end = await decemberMonth.$('.c00397='+endDay);
    await end.click();
  }
  //#endregion

  //#region rooms
  get allMinusAndPlusButtons(){
    return $$('.c00414');
  }
  async addOneChild(){
    let buttons = await this.allMinusAndPlusButtons;
    await buttons[5].click(); // 0 -> 1 child
  }
  //#endregion

  get confirmSearchOnPanel(){
    return $('.c00310');
  }
  async searchHotels(){
    await (await this.confirmSearchOnPanel).click();
    await (await this.hotelCard).waitForDisplayed();
  }
  //#endregion

  //#region hotel list
  get hotelCards(){
    return $$('.c00397');
  }
  get hotelCard(){
    return $('.c00397');
  }
  async dataFromHotelCard(card){
    await expect(card).toBeDisplayed();
    return {
      name: await card.$('.c00142').getText(),
      pricePerNight: await card.$('.c00395').getText()
    };
  }
  async dataFromHotelList(){
    let array = [], hotels = await this.hotelCards;
    for(let hotel of hotels ){
      array.push(await this.dataFromHotelCard(hotel));
    }
    return array;
  }
  //#endregion

  async open(path) {
    return await super.open(path ? path : "http://www.eurostarshotels.co.uk/");
  }
};
module.exports = new EuroStartsHotelsPage();
