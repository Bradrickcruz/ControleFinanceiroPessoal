// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
// const axios = require(axios);
import axios from 'axios';
const API_URL = 'http://localhost:3001/api';

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
// const TransactionModel = require('../models/TransactionModel');

const getAllTransactions = async (period) => {
  if (period) {
    const res = await axios.get(`${API_URL}/transaction?period=${period}`);
    return res.data;
  }
  return { length: 0, results: [] };
};

const getTransactionByDescription = async (period, description = '-') => {
  const res = await axios.get(
    `${API_URL}/transaction/find/${period}/${description}`
  );
  return res.data;
};

const createNewTransaction = async (body_doc) => {
  const res = await axios.post(`${API_URL}/transaction/new`, body_doc);
  return res.data;
};

const updateTransaction = async (id, updatedBody) => {
  const res = await axios.put(
    `${API_URL}/transaction/update/${id}`,
    updatedBody
  );
  return res.data;
};

const deleteTransaction = async (id) => {
  const res = await axios.delete(`${API_URL}/transaction/del/${id}`);
  return res.data;
};

const getAllPeriods = async () => {
  const res = await axios.get(`${API_URL}/transaction/allperiods`);
  return res.data;
};

const getTransactionByID = async (id) => {
  const res = await axios.get(`${API_URL}/transaction/id/${id}`);
  return res.data;
};

export {
  getAllTransactions,
  getTransactionByDescription,
  createNewTransaction,
  updateTransaction,
  deleteTransaction,
  getAllPeriods,
  getTransactionByID,
};
