const productTransactionModel = require('../models/productTransaction.model');


const TransactionHelper = async (page = 1, perPage = 10, search = '', month, res) => {
    const query = {
        $or: [],
    };

    if (search && isNaN(search)) {
        const searchRegex = new RegExp(search, 'i');
        query.$or.push(
            { title: searchRegex },
            { description: searchRegex }
        );
    } else if (!isNaN(search) && search !== '') {
        const price = parseFloat(search);
        if (!isNaN(price)) {  
            const delta = 0.01;
            query.price = {
                $gte: price - delta,
                $lte: price + delta
            };
        }
    }

    if (month) {
        const monthIndex = new Date(`${month} 01, 2020`).getMonth() + 1; 
        query.$expr = { $eq: [{ $month: "$dateOfSale" }, monthIndex] }; 
    }

    try {
        const totalRecords = await productTransactionModel.countDocuments(query);    
        const transactions = await productTransactionModel.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        return { totalRecords, transactions };
    } catch (error) {
        console.log("Error fetching transactions:", error);
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};
const StatisticsHelper = async (month, res) => {
    try {
        const monthIndexMap = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
        };

        const monthIndex = monthIndexMap[month];
        if (monthIndex === undefined) {
            return res.status(400).json({ error: 'Invalid month name' });
        }
      
        const totalSoldItems = await productTransactionModel.countDocuments({
            sold: true,
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthIndex + 1]
            }
        });
     
        const totalNotSoldItems = await productTransactionModel.countDocuments({
            sold: false,
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthIndex + 1]
            }
        });
    
        const totalSaleAmount = await productTransactionModel.aggregate([
            {
                $match: {
                    sold: true,
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthIndex + 1]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSale: { $sum: '$price' },
                },
            },
        ]);

      

        return {
            totalSoldItems,
            totalNotSoldItems,
            totalSaleAmount: totalSaleAmount[0]?.totalSale || 0,
        };
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ error: 'Error fetching statistics', details: error.message });
    }
};

const CategoryApiHelper = async(month,res) =>{
    try {

        const monthIndexMap = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
        };

        const monthIndex = monthIndexMap[month];
        if (monthIndex === undefined) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        const result = await productTransactionModel.aggregate([
            { $match:  {$expr: {$eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }}},
            { $group: { _id: '$category', count: { $sum: 1 } } },
          ]);
         return result
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching categories data' });
    }
}
const BarChartApiHelper = async (month, res) => {
    try {
        const monthIndexMap = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
        };

        const monthIndex = monthIndexMap[month] + 1; 
        if (monthIndex === undefined) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

     
        const ranges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity },
        ];

       
        const result = await Promise.all(ranges.map(async ({ range, min, max }) => {
            const count = await productTransactionModel.countDocuments({
                price: { $gte: min, $lte: max },
                $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] } 
            });
            return { range, count };
        }));

        return result;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching price range data' });
    }
};



module.exports ={
    TransactionHelper,
    StatisticsHelper,
    CategoryApiHelper,
    BarChartApiHelper
}