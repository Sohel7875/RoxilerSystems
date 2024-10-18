const { CategoryApiHelper } = require('./productTransactionHelper');
const CategoryApi =async (req, res) => {
  
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }
  
    try {
      const result = await CategoryApiHelper(month,res)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching categories data' });
    }
  };

  module.exports = CategoryApi
  