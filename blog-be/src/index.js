const  Koa = require('koa');

const app = new Koa();

const getYearByTimeStamp = require('./helpers/utils/index');

app.use((ctx) => {

});

app.listen(3000, () => {
    console.log('start!')
})