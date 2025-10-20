import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

// 🔐 Sua chave privada Twelve Data (segura no servidor)
const API_KEY = "f2bd40ee5275403d9fcdfdc55f71d6b7";

app.use(cors());

app.get("/api", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: "Símbolo não informado" });

  try {
    const response = await fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados da API" });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy rodando em http://localhost:${PORT}`));
