import express from "express";
import * as trainersService from "../services/trainers.service.js";
const router = express.Router();

router.get("/trainers", (req, res) => {
  try {
    const trainers = trainersService.getTrainersData(req.query);
    res.status(200).send(trainers);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

router.get("/trainers/:id", (req, res) => {
  try {
    const { id } = req.params;
    const trainers = trainersService.getTrainerById(id);
    res.status(200).send(trainers);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

router.post("/trainers", (req, res) => {
  const newTrainer = req.body;

  try {
    trainersService.addTrainer(newTrainer);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

router.patch("/trainers/:id", (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    trainersService.updateTrainer(id, body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

router.delete("/trainers/:id", (req, res) => {
  const { id } = req.params;

  try {
    trainersService.deleteTrainer(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

router.delete("/trainers", (req, res) => {
  try {
    trainersService.deleteAllTrainers();
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

export default router;
