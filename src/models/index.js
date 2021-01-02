const Sequelize = require('sequelize');
const config = require('config');

const { name, user, password, host, port } = config.get('database');

const sequelize = new Sequelize(name, user, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 1000000,
        idle: 200000,
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: false,
        freezeTableName: true,
    },
    timezone: '+07:00',
    logging: false,
});
const db = {
  LOAISANPHAM: require('./LOAISANPHAM')(sequelize, Sequelize),
  SANPHAM: require('./SANPHAM')(sequelize, Sequelize),
};

for(let table in db) {
  db[table].associate(db);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;