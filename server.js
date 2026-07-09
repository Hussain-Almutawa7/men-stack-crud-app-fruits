const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dotenv = require("dotenv").config(); // making .env file available
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Fruit = require("./models/fruit.js")

const app = express();

// Connect to MongoDB using connection string in .env
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

//This route will change often
app.get("/fruits", async (req, res) => {
    // Use mongoose method to find Fruit nit ready to eat
    let deletedFruit = await Fruit.findByIdAndDelete("6a4f6b64980d3428ff714f44");

    //View the created fruit
    res.send(deletedFruit);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});


// CODE GRAVEYARD ============================================

// CREATE ONE FRUIT
    // Create the fruit object
    // const fruitData = {
    //     name: "Apple",
    //     isReadyToEat: false,
    // };

    // Use mongoose method to add it to the DB
    // let createdFruit = await Fruit.create(fruitData);

// FIND ALL FRUITS
    // Use mongoose method to find all Fruits
    // let allFruits = await Fruit.find();

// FIND SPECIFIC FRUIT Ex. by name
    // Use mongoose method to find Fruit with sepecific name
    // let findApple = await Fruit.find({
    //     name: "Apple"
    // });

// FIND FRUITs THAT IS NOT READY
    // Use mongoose method to find Fruit that isReadyToEat is false
    // let notReady = await Fruit.find({
    //     isReadyToEat: false
    // });

// FIND FRUIT Ex. by name and update it
    // Use mongoose method to find Fruit nit ready to eat
    // let updatedFruit = await Fruit.findOneAndUpdate({name:"Apple"}, {name: "Pineapple"}, {new: true});

// SAME AS ABOVE BUT BY ID
    // let updatedFruit = await Fruit.findByIdAndUpdate("6a4f6b64980d3428ff714f44", {name: "BananaUpdated"}, {new: true});

// FIND BY ID AND DELETE FRUIT
    // let deletedFruit = await Fruit.findByIdAndDelete("6a4f6b64980d3428ff714f44");