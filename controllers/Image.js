import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "06ce844135c1448abb5cae021c520b4a"
});

const apiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json("error"));
};

const imageHandle = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(error => res.status(400).json("Some thing wrong"));
};

export { imageHandle, apiCall };
