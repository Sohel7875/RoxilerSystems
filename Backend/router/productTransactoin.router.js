const BarChartApi = require('../controllers/barchartapi.controller')
const CategoryApi = require('../controllers/categoryapi.controller')
const CombinedApi = require('../controllers/combineapi.controller')
const Statistics = require('../controllers/statistics.controller')
const Transaction = require('../controllers/transactions.controller')
const router = require('express').Router()

router.get('/transaction', Transaction)
router.get('/statistics', Statistics)
router.get('/price-ranges', BarChartApi)
router.get('/categories', CategoryApi)
router.get('/combined', CombinedApi)

module.exports = router