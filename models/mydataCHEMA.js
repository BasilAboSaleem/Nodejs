const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
    userName : String
  });

  // Create a model based on that schema
const Mydatamodel = mongoose.model("Mydatamodel", articleSchema);
 
// export the model
module.exports = Mydatamodel;