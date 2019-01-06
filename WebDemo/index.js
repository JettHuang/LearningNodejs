const express = require('express');
const bodyParser = require('body-parser');
const readWeb = require('node-readability');

const app = express();
const Article = require('./db').Article;

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // 支持编码为json的请求消息体
app.use(bodyParser.urlencoded({ extended: true })); // 支持编码为表单的请求消息体

app.use(
    '/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 获取所有文章
app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);

        res.format({
            html: () => {
                res.render('articles.ejs', { articles });
            },
            json: () => {
                res.send(articles);
            }
        });
    });
});

// 创建一篇文章
app.post('/articles', (req, res, next) => {
    const url = req.body.url;

    readWeb(url, (err, result) => {
        if (err || !result) {
            res.status(500).send('Error downloading article');
        }

        const article = { title: result.title, content: result.content };
        Article.create(article, (err) => {
            if (err) return next(err);
            res.send('OK'); // 发送状态码为200的响应
        });
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