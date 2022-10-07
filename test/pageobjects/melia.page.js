const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MeliaPage extends Page {
  
  get acceptCookies() {
    return $('#didomi-notice-agree-button');
  }
  //#region search
  //#region destination
  get destinationInputSearch(){
    return $("#suggest-input");
  }  
  get inputDestination(){
    return $$('.button___1vWAZ')[0];
  }
  get cityOption(){
    return $('button.suggestion-text___2xeQh[data-icon="location"]');
  }
  get panelOptions() {
    return $(".c-suggestion-list___2ZYNM");
  }
  async chooseCityDestination(city){
    await (await this.inputDestination).click();
    await this.destinationInputSearch.setValue(city);
    await (await this.panelOptions).waitForDisplayed();
    await (await this.cityOption).waitForClickable();
    await (await this.cityOption).click();
  }
  //#endregion

  //#region calendar
  get panelCalendar(){
    return $('.react-calendar');
  }
  get rightArrowCalendar() {
    return $('.react-calendar__navigation__next-button');
  }
  async chooseDecemberDate(startDay, endDay) {
    await (await this.panelCalendar).waitForDisplayed();
    await (await this.rightArrowCalendar).click();
    let start = await (await this.panelCalendar).$('abbr[aria-label="December ' + startDay + ', 2022"]');
    let end = await (await this.panelCalendar).$('abbr[aria-label="December ' + endDay + ', 2022"]');
    await (await start.parentElement()).click();
    await (await end.parentElement()).click();
  }
  //#endregion

  //#region rooms
  get inputRooms(){
    return $$('.button___1vWAZ')[2];
  }
  get panelRooms() {
    return $('.selection___1J5qs');
  }
  get rightArrowsPeople(){
    return $$('.plus___2yynh');
  }
  async choose1Room2Adults1Child(){
    await (await this.inputRooms).click();
    await (await this.panelRooms).waitForDisplayed();
    await this.rightArrowsPeople[2].click(); // 0 to 1 children
  }
  //#endregion

  get submitSearch(){
    return $('.submit___3burc button');
  }
  async searchHotels(){
    await (await this.submitSearch).click();
    await this.hotelCard.waitForDisplayed();
    await (await this.priceOfHotelCard).waitForDisplayed();
  }
  //#endregion

  //#region hotel list
  get hotelCards(){
    return $$('.c-result-cover___3mtgg');
  }
  get priceOfHotelCard(){
    return $('span.amount___2Xi6Z');
  }
  get hotelCard(){
    return $('.c-result-cover___3mtgg');
  }
  async dataFromHotelCard(card){
    await expect(card).toBeDisplayed();
    let total, available = (await card.getAttribute("data-is-available") === "true");
    if(available) {
      total = await card.$('span.amount___2Xi6Z').getText();
    }
    return {
      name: await card.$('.b-rich-text___157nR').getText(),
      price: (available) ? Number.parseInt(total.split(" ")[1].replace(",","")) : "",
      currency: (available) ? total.split(" ")[0] : "",
      available
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
    return await super.open(path ? path : "https://www.melia.com/en/home.htm");
  }
};
module.exports = new MeliaPage();
