import { Meteor } from "meteor/meteor";
import { Shops } from "/lib/collections";

Meteor.publish("PrimaryShop", () =>
  Shops.find(
    {
      shopType: "primary"
    },
    {
      limit: 1
    }
  )
);

Meteor.publish("AllShops", () =>
  Shops.find(
    {},
    {
      name: 1
    }
  )
);
