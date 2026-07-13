const Fruit = require("../models/fruit");

const home = (req, res) => {
    res.render("home.ejs");
}

const index = async (req, res) => {
    const fruits = await Fruit.find();
    res.render("fruits.ejs", { fruits });
}

const show = async (req, res) => {
    const fruit = await Fruit.findById(req.params.Id)
    res.render("show.ejs", { fruit })
}

const showNewForm = async (req, res) => {
    res.render("new.ejs")
}

const create = async (req, res) => {
    const fruitData = {
        name: req.body.name,
    };

    fruitData.isReadyToEat = req.body.isReadyToEat === "on" ? true : false;

    let createdFruit = await Fruit.create(fruitData);

    res.redirect("/");
}

const editForm = async (req, res) => {
    const fruit = await Fruit.findById(req.params.Id);
    res.render("edit.ejs", { fruit })
}

const update = async (req, res) => {
    req.body.isReadyToEat = req.body.isReadyToEat === "on" ? true : false;

    await Fruit.findByIdAndUpdate(req.params.Id, req.body);

    res.redirect(`/fruits/${req.params.Id}`)
}

const deleteFruit = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.Id);
    res.redirect("/fruits")
}

module.exports = {
    home,
    index,
    show,
    showNewForm,
    create,
    editForm,
    update,
    deleteFruit
}