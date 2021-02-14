const path = require('path'); //path này sẽ mò đến file .handlebars
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('../config/db');
const fontawesome = require('@fortawesome/fontawesome-free');
//HTTP logger
app.use(morgan('combined'));

//Connect
db.connect();

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public'))); //PHẢI ĐỂ THƯ MỤC PUBLIC. VÌ public là phía client side. Những gì nằm trong public là phải được hiện thị ra nên nếu để 'public/img' thì chỉ show ra ảnh nhưng không show ra những folder khác như css (vậy thì trang html sẽ không có được css lên :'((()   ))

//HTTP method override: dùng để PUT, HEAD, TRACE, OPTION trong thẻ <form></form>
app.use(methodOverride('_method'));

//Gọi thư viện để gửi dữ liệu từ form lên server
//XMLHttpRequest, fetch
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//  __dirname: E:\Semester\OJT - On the Job Training\blog\src

//Template engine
//handle bars ra đời để biến phần code business(JAVA, C#) có nhứng html thành phần html thông thường để hiển thị cho người dùng
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', //extension file. Thay vì gõ cái đuôi .handlebars thì mình sẽ đổi thành .hbs
        helpers: {
            sum: (a, b) => a + b, //hỗ trợ cộng chỉ mục. Nó giống tạo thư viện r import vô
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
