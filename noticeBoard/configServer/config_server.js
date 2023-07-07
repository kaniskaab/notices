const express = require("express");
const router = express.Router();
const {getNotices, postNotices, putNotices, getNotice, deleteNotices} = require("../configController/config_controller")
router.route("/").get(getNotices).post(postNotices)
router.route("/:id").get(getNotice).put(putNotices).delete(deleteNotices)

module.exports= router