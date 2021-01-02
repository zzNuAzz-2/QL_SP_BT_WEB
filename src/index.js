const express = require('express');
const morgan = require('morgan');
const config = require('config');
const db = require('./models');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(morgan('[:date[web]] :method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('public'))

app.get('/', async (req, res, next) => {
    const type = await db.LOAISANPHAM.findAll({raw: true});
    const filter = {};
    if (req.query.product_type !== "all") {
        filter.loai = req.query.product_type;
    }
    const products = await db.SANPHAM.findAll({ where: filter, raw: true })
    const product_type = type.map(t => {
        if(t.ma_loai === req.query.product_type) {
            t.selected = true;
        }
        return t;
    })
    res.render('index', {product_type, products});
});

db.sequelize
    .sync({
        force: false,
        // logging: console.log,
    })
    .then(async () => {
        console.log(`Running mode: ${process.env.NODE_ENV ? process.env.NODE_ENV : "default"}`)
        console.log('Connect database success.');
        app.listen(config.get('port'), e => {
            if (!e) {
                console.log(`Server is running on port ${config.get('port')}`);
            }
        });
    })
    .catch(err => {
        console.log(err.message);
        process.exit();
    });
