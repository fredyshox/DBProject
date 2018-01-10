const db = require('../db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const BaseModel = require('./baseModel');
var name = 'Product';

class Product extends BaseModel {
  constructor() {
    super(name);
  }
}

Product.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS  \`Products\` (
                	\`ID\` INT NOT NULL AUTO_INCREMENT,
                	\`name\` varchar(64) NOT NULL,
                	\`price\` FLOAT NOT NULL,
                	\`description\` varchar(512) NOT NULL,
                	\`quantity\` INT NOT NULL,
                	\`parentID\` INT NOT NULL,
                	PRIMARY KEY (\`ID\`)
                );`))
  console.log(name + " created")
})

Product.prototype.products = (lastRow = 0, name = '') => {
  var itemCount = 10;
  var querySql = `SELECT *
                  FROM \`Products\` p`

  if (name.length > 2) {
    var pattern = '%' + name + '%';
    querySql = querySql + ' WHERE p.name LIKE ?';
    querySql = db.format(querySql, [pattern]);
  }
  querySql = querySql + ' LIMIT ?,?'
  querySql = db.format(querySql, [lastRow, lastRow + itemCount]);

  return db.execute(querySql);
}

Product.prototype.productWithID = (id) => {
  return db.execute(`SELECT *
                     FROM \`Products\` p
                     WHERE p.ID = ?`, [id]);
}


module.exports = new Product();