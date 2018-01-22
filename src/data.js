import mongoose from 'mongoose'
import lorem from 'lorem-ipsum'
import config from './config'
import UserService from './service/userService'
import ArticleService from './service/articleService'
//*功能*
//连接数据库
mongoose.connect(config.DB_URL)
let db = mongoose.connection

// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
    console.log(err);
});

//得到用户

UserService.getAll()
	.then(users => {
		users.map( item => {
			for( let i = 0; i < 10; i++ ){
				let title = lorem({ count : 1, units : 'sentence' });
				let author = item.id;
				let content = lorem({ count : 30, units : 'sentence' });
				let article = {
					title : title,
					author : author,
					content : content
				}
				ArticleService.add(article)
			}
		}) 
	})

//遍历用户，添加文章





