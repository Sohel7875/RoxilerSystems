const { StatisticsHelper } = require('./productTransactionHelper');

const Statistics = async (req, res) => {
    const { month } = req.query;
   

    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }


    try {
      const statistics = await StatisticsHelper(month,res)

       return res.status(200).json(statistics);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching statistics' });
    }
};

module.exports = Statistics;
