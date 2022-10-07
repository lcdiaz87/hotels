const melia = require("../pageobjects/melia.page");

describe("melia", () => {
  let startDay = 15, endDay = 31;
  before(async () => {
    await melia.open();
  });
  it("should consent cookies", async () => {
    let accept = await melia.acceptCookies;
    await expect(accept).toBeClickable();
    await accept.click();
  });
  it("should search", async () => {
    await melia.chooseCityDestination("Valencia");
    await melia.chooseDecemberDate(startDay, endDay);
    await melia.choose1Room2Adults1Child();
    await melia.searchHotels();
  });
  it("should get hotel list", async() => {
    let hotels = await melia.dataFromHotelList();
    let diff = endDay - startDay;
    for(let hotel of hotels) {
      console.log("Melia - " + hotel.name + " - " + ((hotel.available) ?  Number.parseInt(hotel.price/diff) + " " + hotel.currency : "Not Available") + " - " + ((hotel.available && (Number.parseInt(hotel.price / diff) < 100))? "YES" : "NO"));
    }
  });
});