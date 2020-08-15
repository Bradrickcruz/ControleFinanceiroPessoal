const express = require('express');
const transactionRouter = express.Router();
const {
  getAllTransactions,
  getTransactionByDescription,
  createNewTransaction,
  updateTransaction,
  deleteTransaction,
  getAllPeriods,
  getTransactionByID,
} = require('../Controllers/TransactionControllers.js');

transactionRouter.get('/', getAllTransactions);

transactionRouter.get(
  '/find/:period/:description',
  getTransactionByDescription
);

transactionRouter.get('/id/:id', getTransactionByID);

transactionRouter.post('/new', createNewTransaction);

transactionRouter.put('/update/:id', updateTransaction);

transactionRouter.delete('/del/:id', deleteTransaction);

transactionRouter.get('/allperiods', getAllPeriods);

module.exports = transactionRouter;
