const express = require("express");

const corsMiddleware = require("./middleware/cors");

const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.get("/", (req, res) => {
  res.send("Hi World");
});

app.post("/feetback", async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: `${req.body.subject}`,
      text: `Повідомлення з bazinger_react: ${req.body.name}`,
      html: `<b>Твоє імʼя: ${req.body.name}.</b> <br>Ти відпраив ось цей текст: ${req.body.message}`,
    });
  } catch (error) {
    console.log(error);
  }
  console.log(req.body);
});

app.listen(8080, () => {
  console.log(8080);
});
