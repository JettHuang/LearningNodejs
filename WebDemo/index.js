const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const articles = [{ title: 'Example' }];

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // 支持编码为json的请求消息体
app.use(bodyParser.urlencoded({ extended: true })); // 支持编码为表单的请求消息体

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 获取所有文章
app.get('/articles', (req, res, next) => {
    res.send(articles);
});

// 创建一篇文章
app.post('/articles', (req, res, next) => {
    const article = { title: req.body.title };
    articles.push(article);
    res.send(article);

    console.log("post request: ", req.body);
});

// 获取指定文章
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Fetching:', id);
    res.send(articles[id]);
});

// 删除指定文章
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Deleting:', id);
    delete articles[id];
    res.send({ message: 'Deleted' });
});

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`);
});