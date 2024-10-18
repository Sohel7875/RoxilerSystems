const mongoose = require('mongoose')

const productTransactionSchema = new mongoose.Schema({
id:{
    type:Number,
    require:true,
    unique:true,
    index: true,
}, 

title: {
    type: String,
    required: true,
    trim: true,
    index: 'text', 
  },
  price: {
    type: Number,
    required: true,
    min: 0,        
    index: true,   
  },
  description: {
    type: String,
    trim: true,
    index: 'text', 
  },

  category: {
    type: String,
    required: true,
    index: true,  
  },
  image: {
    type: String, 
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
    default: false, 
    index: true,    
  },
  dateOfSale: {
    type: Date,
    required: true,
    index: true,   
  }
},{
    timestamps:true
})

const ProductTransaction = mongoose.model('productTransaction',productTransactionSchema)

module.exports = ProductTransaction