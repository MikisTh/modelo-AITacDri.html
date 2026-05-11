const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const alimentos = require("./taco.json");

app.get("/alimentos", (req, res) => {
  res.json(alimentos);
});

app.post("/calcular", (req, res) => {

  const { nome, quantidade } = req.body;

  const alimento = alimentos.find(
    a => a.nome.toLowerCase() === nome.toLowerCase()
  );

  if (!alimento) {

    return res.status(404).json({
      erro: "Alimento não encontrado"
    });

  }

  const fator = quantidade / 100;

  res.json({

    nome: alimento.nome,

    quantidade,

    carboidrato:
      alimento.carboidrato * fator,

    proteina:
      alimento.proteina * fator,

    gordura:
      alimento.gordura * fator,

    fibra:
      alimento.fibra * fator,

    sodio:
      alimento.sodio * fator,

    calcio:
      alimento.calcio * fator,

    ferro:
      alimento.ferro * fator,

    kcal:
      alimento.kcal * fator

  });

});

app.listen(3000, () => {
  console.log("API rodando");
});
