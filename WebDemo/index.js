const express = require('express');
const app = express();
const articles = [{ title: 'Example' }];

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 获取所有文章
app.get('/articles', (req, res, next) => {
    res.send(articles);
});

// 创建一篇文章
app.post('/articles', (req, res, next) => {
    res.send('OK');
});

// 获取指定文章
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Fetching:', id);
    res.send(articles[id]);
});

// 删除指定文章
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Deleting:', id);
    delete articles[id];
    res.send({ message: 'Deleted' });
});

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`);
});