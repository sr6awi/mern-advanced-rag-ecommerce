const Address = require("../models/Address");

const addresses = [
  {
    user: "6823220b0678dd284ac6ac83",
    street: "Ciu Uni - street",
    city: "Lefkosa",
    state: "Nicosia",
    phoneNumber: "+90 554 55899",
    postalCode: "00000",
    country: "Northern Cyprus",
    type: "Home",
  },
];

exports.seedAddress = async () => {
  try {
    await Address.insertMany(addresses);
    console.log("Address seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
