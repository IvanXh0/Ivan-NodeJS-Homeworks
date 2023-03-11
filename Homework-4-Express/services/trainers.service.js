import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const trainersDbPath = path.join(__dirname, "..", "trainers.json");

export const getTrainersData = (query) => {
  let trainers = JSON.parse(
    fs.readFileSync(trainersDbPath, { encoding: "utf-8" })
  );

  if (trainers?.length <= 0) {
    throw new Error("There are no trainers");
  }

  if (query?.currentlyActive) {
    trainers = trainers.filter((t) => t.isCurrentlyTeaching);
  }

  if (query?.sortBy === "coursesAsc") {
    trainers = trainers.sort((a, b) => a.coursesFinished - b.coursesFinished);
  }

  if (query?.sortBy === "coursesDesc") {
    trainers = trainers.sort((a, b) => b.coursesFinished - a.coursesFinished);
  }

  return trainers;
};

export const getTrainerById = (id) => {
  const trainers = getTrainersData();

  const trainer = trainers.find((t) => t.id === id);

  if (!trainer) {
    throw new Error(`Trainer with id ${id} not found.`);
  }

  return trainer;
};

export const saveTrainerData = (trainers) => {
  fs.writeFileSync(trainersDbPath, JSON.stringify(trainers, null, 2));
};

export const addTrainer = (trainer) => {
  const trainers = getTrainersData();

  trainers.push({
    ...trainer,
    id: uuidv4(),
  });

  saveTrainerData(trainers);
};

export const updateTrainer = (id, trainer) => {
  const trainers = getTrainersData();

  const index = trainers.findIndex((t) => t.id === id);

  if (index < 0) {
    throw new Error(`Trainer with id ${id} not found.`);
  }

  trainers[index] = {
    ...trainers[index],
    ...trainer,
  };
  saveTrainerData(trainers);
};

export const deleteTrainer = (id) => {
  const trainers = getTrainersData();

  if (!trainers.find((t) => t.id === id)) {
    throw new Error(`Trainer with id ${id} not found.`);
  }

  const filteredTrainers = trainers.filter((t) => t.id !== id);

  saveTrainerData(filteredTrainers);
};

export const deleteAllTrainers = () => {
  const trainers = [];
  saveTrainerData(trainers);
};
