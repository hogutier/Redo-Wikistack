const router = require("express").Router();
const { User, Page } = require("../models");
const {
  userList,
  userPages,
  addPage,
  editPage,
  main,
  wikiPage
} = require("../views");

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
 /*    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    }); */
    const pages = await user.getPages();
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});
module.exports = router;
