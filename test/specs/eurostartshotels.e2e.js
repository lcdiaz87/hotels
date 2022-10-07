const euroStartsHotels = require("../pageobjects/eurostartshotels.page");


describe("eurostartshotels", () => {
  before(async () => {
    await euroStartsHotels.open();
  });
  it("should consent cookies", async () => {
    let accept = await euroStartsHotels.acceptCookies;
    await expect(accept).toBeClickable();
    await accept.click();
  });
  it("should search", async () => {
    await euroStartsHotels.chooseCityDestination("Valencia");
    await euroStartsHotels.chooseDecemberDate(15, 31);
    await euroStartsHotels.addOneChild();
    await euroStartsHotels.searchHotels();
  });
  it("should get hotel list", async() => {
    let priceWithoutCurrency, hotels = await euroStartsHotels.dataFromHotelList();
    for(let hotel of hotels) {
      priceWithoutCurrency = Number.parseInt(hotel.pricePerNight.split(" ")[0]);
      //console.table("Eurostarts - " + hotel.name + " - " + hotel.pricePerNight + " - " + ((priceWithoutCurrency < 100)? "YES" : "NO"));
      euroStartsHotels.table.push("Eurostarts - " + hotel.name + " - " + hotel.pricePerNight + " - " + ((priceWithoutCurrency < 100)? "YES" : "NO"));
    }
    console.table("DENTRO");
    console.table(euroStartsHotels.table);
  });
});