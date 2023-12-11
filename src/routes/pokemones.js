import express from "express";
import * as pokemones from "../services/pokemonesServices.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  const findPokemon = await pokemones.findById(req.params.id);
  console.log("findPokemon", findPokemon);
  return findPokemon != null ? res.send(findPokemon) : res.sendStatus(404);
});
router.get("/", (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});
router.post("/", (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const newDiaryEntry = diaryServices.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(newDiaryEntry);
});

export default router;
