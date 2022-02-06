const router = require("express").Router();
const CategoryModel = require("../models/Category");

//GET Category by Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    CategoryModel.findById(id)
        .then((category) => res.status(200).json(category))
        .catch((err) => res.status(404).json("Category not found"))
})

//GET all Categories
router.get('/', async (req, res) => {
    CategoryModel.find()
        .then((categories) => res.status(200).json(categories))
        .catch((err) => res.status(404).json(err))
})

//POST
router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(500).json("Name is required");
        return;
    }
    CategoryModel.create({
        name
    })
        .then((category) => res.status(200).json(category))
        .catch((err) => res.status(500).json(err))
})

//DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json(`Category ${id} not found`);
    CategoryModel.findByIdAndDelete(id)
        .then((category) => res.status(200).json("Record deleted"))
        .catch((err) => res.status(500).json(err))
})

module.exports = router;