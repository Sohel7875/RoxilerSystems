const { BarChartApiHelper } = require('./productTransactionHelper');

const BarChartApi =  async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }
  
    try {
      const result = await BarChartApiHelper(month,res)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching price range data' });
    }
  };
  
  module.exports = BarChartApi