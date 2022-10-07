const nhHotels = require("../pageobjects/nh-hotels.page");


describe("nh-hotels", () => {
  before(async () => {
    await nhHotels.open();
  });
  it("should consent cookies", async () => {
    let accept = await nhHotels.acceptCookies;
    await expect(accept).toBeClickable();
    await accept.click();
  });
  it("should search", async () => {
    await nhHotels.chooseCityDestination("Valencia", "Spain");
    await nhHotels.chooseDecemberDate(15, 31);
    await nhHotels.choose1Room2Adults1Child();
    await nhHotels.searchHotels();
  });
  it("should get hotel list", async() => {
    let hotels = await nhHotels.dataFromHotelList();
    for(let hotel of hotels) {
      console.table("NH - " + hotel.name + " - " + ((hotel.notAvailable.length > 0) ? "Not Available" : hotel.pricePerNight + " " + hotel.currency) + " - " + ((Number.parseInt(hotel.pricePerNight) < 100)? "YES" : "NO"));
    }
  });
});