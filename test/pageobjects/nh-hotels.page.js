const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NhHotelsPage extends Page {
  
  get acceptCookies() {
    return $('#consent-prompt-submit');
  }
  //#region search
  //#region destination
  get destinationInputSearch(){
    return $("#location2-sb");
  }  
  get panelOptions() {
    return $(".autocomplete-results");
  }
  async chooseCityDestination(city, country){
    await this.destinationInputSearch.setValue(city);
    await (await this.panelOptions).waitForDisplayed();
    let destination = await $('.destination li[data-value="' + city + ", " + country + '"]');
    await destination.waitForClickable();
    await destination.click();
  }
  //#endregion

  //#region calendar
  get calendar(){
    return $('.calendar-booking');
  }
  get panelCalendar(){
    return $('.calendar-booking-dropdown');
  }
  get rightArrowCalendar() {
    return $('.is-after');
  }
  async chooseDecemberDate(startDay, endDay){
    await this.calendar.click();
    await (await this.panelCalendar).waitForDisplayed();
    await (await this.rightArrowCalendar).click();
    await (await $('button[data-day="' + startDay + '"][data-month="11"]')).click();
    await (await $('button[data-day="' + endDay + '"][data-month="11"]')).click();
  }
  //#endregion

  //#region rooms
  get inputRooms(){
    return $('#optionRooms');
  }
  get panelRooms() {
    return $('.m-occupancy-wrapper');
  }
  get rightArrowsPeople(){
    return $$('.nh-ic-plus');
  }
  async choose1Room2Adults1Child(){
    await (await this.inputRooms).click();
    await (await this.panelRooms).waitForDisplayed();
    await this.rightArrowsPeople[1].click(); // 0 to 1 children
  }
  //#endregion

  get submitSearch(){
    return $('#btn-search');
  }
  async searchHotels(){
    await (await this.submitSearch).click();
    await this.hotelCard.waitForDisplayed();
    await this.hotelCard.$('.spinner').waitForDisplayed();
    await this.hotelCard.$('.spinner').waitForDisplayed({reverse: true});
  }
  //#endregion

  //#region hotel list
  get hotelCards(){
    return $$('.m-hotel-box-main');
  }
  get hotelCard(){
    return $('.m-hotel-box-main');
  }
  async dataFromHotelCard(card){
    await expect(card).toBeDisplayed();
    return {
      name: await card.$('.h4.title').getText(),
      pricePerNight: await card.$('.night-amount').getText(),
      currency: await card.$('.night-currency').getText(),
      notAvailable: await card.$('.color-alert.noAvailableData.withDates').getText()
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

  
  get loading(){
    return $('.spinner');
  }

  async open(path) {
    return await super.open(path ? path : "http://www.nh-hotels.com/");
  }
};
module.exports = new NhHotelsPage();
