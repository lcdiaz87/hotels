const melia = require("../pageobjects/melia.page");
const FileSaver = require('file-saver');

describe("melia", () => {
  let startDay = 15, endDay = 31;
  before(async () => {
    await melia.open();
  });
  it.only("should consent cookies", async () => {
    
    var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "hello world.txt");
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
    console.log("diff", diff);
    for(let hotel of hotels) {
      console.log(hotel);
      console.table("Melia - " + hotel.name + " - " + ((hotel.available) ?  Number.parseInt(hotel.price/diff) + " " + hotel.currency : "Not Available") + " - " + ((hotel.available && (Number.parseInt(hotel.price / diff) < 100))? "YES" : "NO"));
    }
  });
});