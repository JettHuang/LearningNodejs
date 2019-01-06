*How to Run:*

**Launch server**
1. npm install
2. npm start

**Run client**
1. curl http://localhost:3000/articles  获取所有文章
2. curl http://localhost:3000/articles/0 获取指定文章
3. curl -X DELETE http://localhost:3000/articles/0 删除指定文章
4. curl --data "url=http://manning.com/cantelon2"  http://localhost:3000/articles 添加文章


