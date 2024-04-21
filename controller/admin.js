const CATEGORY = require('../model/category_model');

exports.add_category = async function (req, res, next) {
    try {
        req.body.image = req.file.filename

        let data = await CATEGORY.create(req.body);

        res.status(200).json({
            status: "Success",
            message: "Category Added",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

exports.show_category = async function (req, res, next) {
    try {

        let data = await CATEGORY.find();

        res.status(200).json({
            status: "Success",
            message: "All Categories",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

exports.update_category = async function (req, res, next) {
    try {
        let c_id = req.params.id
        let data = await CATEGORY.findByIdAndUpdate(c_id, req.body)

        res.status(200).json({
            status: "Success",
            message: "Category Updated",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

exports.delete_category = async function (req, res, next) {
    try {
        let c_id = req.params.id
        let data = await CATEGORY.findByIdAndDelete(c_id)
        res.status(200).json({
            status: "Success",
            message: "Category is Deleted",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}
