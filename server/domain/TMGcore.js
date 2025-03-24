
class TMGcore {

  static data = {
    email: "ProductSupport@TMGcore.com",
    phone: "+1-680-888-6886",
    fax: "+1-469-541-1338",
    web: "www.TMGcore.com",
    address: {
      street: "6815 Communications Parkway",
      city: "Plano",
      state: "Texas",
      zip: "75024",
    },
  };

  static CONFIG_DIR = "./config";
  static CRYPTO_INFO = "./config/cryptoinfo.json";

}

Object.freeze(TMGcore);

module.exports = TMGcore;
