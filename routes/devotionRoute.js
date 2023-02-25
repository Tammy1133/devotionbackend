const DevotionModel = require("../models/devotion");
const router = require("express").Router();

router.get("/devotionitems", async (req, res) => {
  try {
    const data = await DevotionModel.find({});
    res.status(200).send(data);
  } catch (error) {
    res.status(409).send(error);
  }
});

router.delete("/deletedevotionitem/:id", async (req, res) => {
  try {
    await DevotionModel.findByIdAndDelete(req.params.id);
    res.status(201).send("Deleted successfully");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.post("/adddevotionitem", async (req, res) => {
  const { date, verse, title, versedetails, word, prayer } = req.body;

  try {
    if (!(date, verse, title, versedetails, word, prayer)) {
      res.status(401).send("All inputs required");
    } else {
      const newModel = await new DevotionModel({
        date,
        verse,
        title,
        versedetails,

        word,
        prayer,
      });
      await newModel.save();
      res.status(201).send(newModel);
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

router.put("/editdevotiondetails/:id", async (req, res) => {
  const { date, verse, title, versedetails, word, prayer } = req.body;
  if (
    !(date.split("").length > 6,
    title.split("").length > 6,
    verse.split("").length > 3,
    versedetails.split("").length > 3,
    word.split("").length > 3,
    prayer.split("").length > 3)
  ) {
    res.status(401).send("All inputs required");
  } else {
    // const exists = DevotionModel.findById(id);

    try {
      const newItem = await DevotionModel.findByIdAndUpdate(req.params.id, {
        date,
        verse,
        title,
        versedetails,
        word,
        prayer,
      });

      res.status(201).send("Updated Successfully");
    } catch (error) {
      res.status(401).send(error);
    }
  }
});

module.exports = router;
