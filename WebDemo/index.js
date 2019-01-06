const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Article = require('./db').Article;

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // 支持编码为json的请求消息体
app.use(bodyParser.urlencoded({ extended: true })); // 支持编码为表单的请求消息体

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 获取所有文章
app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.send(articles);
    });
});

// 创建一篇文章
app.post('/articles', (req, res, next) => {
    const article = { title: req.body.title, content: req.body.content };
    Article.create(article, (err) => {
        if (err) return next(err);
        res.send('OK');
    });
});

// 获取指定文章
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Fetching:', id);
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    });
});

// 删除指定文章
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Deleting:', id);
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: 'Deleted' });
    });
});

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`);
});

module.exports = app;