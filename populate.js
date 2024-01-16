#! /usr/bin/env node
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Eliquid = require("./models/eliquid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  const categories = await Category.findOne({ name: "tabaquiles" });
  if (categories == null) throw new Error("couldn't find categories");
  const newEliquid = new Eliquid({
    name: "Pato",
    description:
      "pato purific is the best seller on our shop the users love this one",
    category: categories,
    price: {
      small: 120,
      medium: 180,
      large: 220,
    },
    number_in_stock: {
      small: 5,
      medium: 3,
      large: 1,
    },
  });
  await newEliquid.save();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createCategory(name, index) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    createCategory("tabaquiles", 0),
    createCategory("frutales", 1),
    createCategory("postres", 2),
  ]);
}
