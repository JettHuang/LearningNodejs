// 数据库模块

const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    // 创建articles表
    const sql = `CREATE TABLE IF NOT EXISTS articles
            (id integer primary key, title, content TEXT)`;
    db.run(sql);
});

class Article {
    // 获取所有文章
    static all(cb) {
        db.all('SELECT * FROM articles', cb);
    }

    // 查找某个文章
    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb);
    }

    // 新建文章
    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
        db.run(sql, data.title, data.content, cb);
    }

    // 删除记录
    static delete(id, cb) {
        if (id) {
            return cb(new Error('Please provide an id'));
        }

        db.run('DELETE FROM articles WHERE id = ?', id, cb);
    }
}

console.log("exports == module.exports ?", exports == module.exports);
/*
console.log("exports:", exports);
console.log("db module:", module);
console.log("db module.exports:", module.exports);
*/

module.exports = db;
module.exports.Article = Article;