const transactionModel = require('../models/TransactionModel.js');

// seleciona todos as transactions de um periodo
const getAllTransactions = async (req, res) => {
  const { period } = req.query;
  if (!period) {
    res.status(400).send({
      error:
        'É necessário informar o parâmetro "period",cujo valor deve estar no formato yyyy-mm.',
    });
  }
  const selectedDocs = await transactionModel.find({ yearMonth: period });
  res.send({
    length: selectedDocs.length,
    results: selectedDocs,
  });
};

// seleciona uma transaction com base na descrição
const getTransactionByDescription = async (req, res) => {
  const { period, description } = req.params;
  const selectedDocs = await transactionModel.find({
    description: { $regex: `.*${description}.*`, $options: 'i' },
    yearMonth: period,
  });
  res.send({
    length: selectedDocs ? selectedDocs.length : 0,
    results: selectedDocs ? selectedDocs : ['Not found'],
  });
};

// seleciona uma transaction com base no id
const getTransactionByID = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedDocs = await transactionModel.find({
      _id: id,
    });
    res.send({
      results: selectedDocs[0],
    });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

// cria uma nova transaction
const createNewTransaction = async (req, res) => {
  const params = { ...req.body };
  try {
    const newDocument = await new transactionModel(params);
    await newDocument.save();
    res.send({ msg: 'Documento criado com sucesso', doc: newDocument });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
  res.send({});
};

// atualiza uma transaction pelo id
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const params = req.body;

  try {
    const updatedDoc = await transactionModel.findByIdAndUpdate(id, params, {
      new: true,
    });
    await updatedDoc.save();
    res.send({ updated: updatedDoc });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

// deleta uma transaction pelo id
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDoc = await transactionModel.findOneAndRemove({ _id: id });
    res.send({ deleted: true });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

const getAllPeriods = async (req, res) => {
  try {
    const allPeriods = await transactionModel
      .find({}, { yearMonth: 1 })
      .distinct('yearMonth');

    console.log(allPeriods);
    res.send({ allPeriods: allPeriods });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionByDescription,
  createNewTransaction,
  updateTransaction,
  deleteTransaction,
  getAllPeriods,
  getTransactionByID,
};
