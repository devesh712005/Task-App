const express = require("express");
const amqp = require("amqplib");
const mongoose = require("mongoose");
const PORT = 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://mongo:27017/tasks")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Mongodb connection error: ", err));

const TaskSchema = mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

let channel, connection;

async function connectRabbitMQWithRetry(retries = 5, delay = 3000) {
  while (retries) {
    try {
      connection = await amqp.connect("amqp://rabbitmq_node");
      channel = await connection.createChannel();
      await channel.assertQueue("task_created");
      console.log("Connected to rabbitMQ");
      return;
    } catch (error) {
      console.error("RabbitMQ Connection Error: ", error.message);
      retries--;
      console.error("retrying again : ", retries);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

app.get("/tasks", async (req, res) => {
  const task = await Task.find();
  res.status(200).json(task);
});

app.post("/tasks", async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const task = new Task({ title, description, userId });
    await task.save();

    const message = { taskId: task._id, userId, title };

    if (!channel) {
      return res.status(503).json({ error: "RabbitMQ not connected" });
    }

    channel.sendToQueue("task_created", Buffer.from(JSON.stringify(message)));

    res.status(201).json(task);
  } catch (error) {
    console.error("Error saving: ", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Task service  is running at ${PORT}`);
  connectRabbitMQWithRetry();
});
