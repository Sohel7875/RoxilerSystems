const { TransactionHelper, StatisticsHelper, BarChartApiHelper, CategoryApiHelper } = require('./productTransactionHelper.js');

const CombinedApi = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }

    try {

       const transactionsResponse = await TransactionHelper(month,res);
        const statisticsResponse = await StatisticsHelper(month,res);     
        const priceRangesResponse = await BarChartApiHelper(month,res);    
        const categoriesResponse = await CategoryApiHelper(month,res);
        
        res.status(200).json({
            transactions: transactionsResponse.transactions,
            statistics: statisticsResponse,
            priceRanges: priceRangesResponse,
            categories: categoriesResponse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching combined data' });
    }
};

module.exports = CombinedApi;
