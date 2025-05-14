const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const response = await fetch("http://a1127351.xsph.ru/index.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text(); // или .json() если JSON
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Ошибка прокси:", error);
    res.status(500).json({ success: false, error: "Proxy error" });
  }
});

app.listen(PORT, () => {
  console.log(`Прокси работает на порту ${PORT}`);
});
