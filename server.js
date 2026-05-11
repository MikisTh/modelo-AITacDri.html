const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const alimentos = require("./taco.json");

/*
  ROTA PRINCIPAL
*/

app.get("/", (req, res) => {

  res.send("API TACO ONLINE");

});

/*
  LISTAR ALIMENTOS
*/

app.get("/alimentos", (req, res) => {

  res.json(alimentos);

});

/*
  CALCULAR COMPOSIÇÃO
*/

app.post("/calcular", (req, res) => {

  const { nome, quantidade } = req.body;

  /*
    VALIDAÇÕES
  */

  if (!nome || !quantidade) {

    return res.status(400).json({
      erro: "Nome e quantidade são obrigatórios"
    });

  }

  /*
    BUSCAR ALIMENTO
  */

  const alimento = alimentos.find(
    a =>
      a.nome.toLowerCase()
      === nome.toLowerCase()
  );

  /*
    NÃO ENCONTRADO
  */

  if (!alimento) {

    return res.status(404).json({
      erro: "Alimento não encontrado"
    });

  }

  /*
    CÁLCULO PROPORCIONAL
  */

  const fator = quantidade / 100;

  const resultado = {

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

  };

  res.json(resultado);

});

/*
  PORTA RENDER
*/

const PORT =
  process.env.PORT || 3000;

/*
  INICIAR SERVIDOR
*/

app.listen(PORT, () => {

  console.log(
    `API rodando na porta ${PORT}`
  );

});
