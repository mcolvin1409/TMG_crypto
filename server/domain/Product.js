const Product = require("../../productList.json"),
  ProductNames = {};

const version = [
  "OTTO",
  "OTTO",
  "OTTO",
  "OTTO",
  "EdgeBox",
  "EdgeBox",
  "EdgeBox",
  "CryptoCore",
  "CryptoCore",
  "CryptoCore",
  "ComputeCore"
];

for (const [key, value] of Object.entries(Product)) {
  ProductNames[value] = [ key, version[value] ];
}

Object.freeze(Product);
Object.freeze(ProductNames);

module.exports = { Product, ProductNames };
