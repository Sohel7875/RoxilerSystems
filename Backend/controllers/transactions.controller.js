const { TransactionHelper } = require('./productTransactionHelper');

const Transaction = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
try {
    const transaction =await TransactionHelper( page, perPage , search, month,res)
    res.status(200).json(transaction);
} catch (error) {
    console.log("Error fetching transactions:", error);
    res.status(500).json({ error: 'Error fetching transactions' });
  
}
 
};

module.exports = Transaction;
