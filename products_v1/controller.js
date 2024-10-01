const db = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const index = (req, res) => {
  db.collection("products")
    .find()
    .toArray()
    .then((result) =>
      res.json({
        status: "success",
        data: result,
      })
    )
    .catch((error) =>
      res.json({
        status: "Failed",
        message: error.message,
      })
    );
};

const view = (req, res) => {
  const { id } = req.params;
  db.collection("products")
    .findOne({ _id: new ObjectId(id) })
    .then((result) =>
      res.json({
        status: "Success",
        product: result,
      })
    )
    .catch((error) =>
      res.json({
        status: "failed",
        message: error.message,
      })
    );
};

const store = (req, res) => {
  const { name, price, status, stock, user_id } = req.body;
  const image = req.file;
  db.collection("products")
    .insertOne({
      name,
      price,
      status,
      stock,
      user_id,
      image_url: `/${image.path}`,
    })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, price, status, stock, user_id } = req.body;
  const image = req.file;
  db.collection("products")
    .updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          price,
          status,
          stock,
          user_id,
          image_url: `/${image.path}`,
        },
      }
    )
    .then((result) =>
      res.json({
        status: "success",
        data: result,
      })
    )
    .catch((error) =>
      res.json({
        status: "failed",
        error: error.message,
      })
    );
};

const destroy = (req, res) => {
  db.collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
