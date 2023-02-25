const BlogModel = require("../models/blog");
const router = require("express").Router();

router.get("/blogitems", async (req, res) => {
  try {
    const data = await BlogModel.find({});
    res.status(200).send(data);
  } catch (error) {
    res.status(409).send(error);
  }
});

router.post("/addblogitem", async (req, res) => {
  const { date, image, title, intro, details } = req.body;

  try {
    if (!(date, image, title, intro, details)) {
      res.status(401).send("All inputs required");
    } else {
      const newModel = await new BlogModel({
        date,
        image,
        title,
        intro,
        details,
      });
      await newModel.save();
      res.status(201).send(newModel);
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

router.delete("/deleteblogitem/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.status(201).send("Deleted successfully");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.put("/editblogdetails/:id", async (req, res) => {
  const { date, image, title, intro, details } = req.body;
  if (
    !(date.split("").length > 6,
    title.split("").length > 6,
    intro.split("").length > 6,
    details.split("").length > 6)
  ) {
    res.status(401).send("All inputs required");
  } else {
    const exists = BlogModel.findById(req.params.id);

    if (image.split("").length > 1) {
      const newItem = await BlogModel.findByIdAndUpdate(req.params.id, {
        date,
        image,
        title,
        intro,
        details,
      });

      res.status(201).send("Updated Successfully");
    } else {
      const newItem = await BlogModel.findByIdAndUpdate(req.params.id, {
        date,
        title,
        intro,
        details,
      });

      res.status(201).send("Updated Successfully");
    }
  }
});

module.exports = router;
