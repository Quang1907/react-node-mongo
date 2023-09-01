const TaskModel = require("../models/TaskModule");

module.exports.getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};

module.exports.saveTasks = (req, res) => {
  const { task } = req.body;
  TaskModel.create({ task })
    .then((data) => {
      console.log("Saved successfully...");
      res.status(201).send({ data: data, msg: "Saved successfully..." });
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong!!" });
    });
};

module.exports.updateTasks = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => res.status(201).send("updated successfully."))
    .catch((err) => {
      console.log("err: ", err);
      res.send({ error: err, msg: "something went wrong!!" });
    });
};

module.exports.deleteTasks = (req, res) => {
  const { id } = req.params;
  TaskModel.findByIdAndDelete(id)
    .then(() => res.status(201).send("deleted successfully"))
    .catch((err) => {
      console.log("err: ", err);
      res.send({ error: err, msg: "something went wrong!!!" });
    });
};
