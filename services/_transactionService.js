const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const axios = require(axios);
const API_URL = 'https://localhost:3001/api';

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const getAllTransactions = async () => {
  const res = await axios.get(`${API_URL}/transaction?period=2020-07`);
  console.log(res);
  return res;
};

module.exports = { getAllTransactions };
