const express = require("express");
const app = express();
const https = require('https');
const http = require("http").createServer(app);
const multer = require('multer');
const mysql = require("mysql");
const path = require("path");
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/profilePics', express.static('profilePics'));
app.use('/itemPics', express.static('itemPics'));
app.use('/toolPics', express.static('toolPics'));
app.use('/landPics', express.static('landPics'));
app.use('/templates', express.static('templates'));

app.set('view engine', 'ejs');


const { request } = require("http");
const { response, query } = require("express");
const { data } = require("@tensorflow/tfjs");

const idir = './itemPics';
const tdir = './toolPics';
const ldir = './landPics';

var otp = {};

var assign = multer.diskStorage({
    destination: function (req, file, cb) {

        if (file.fieldname === "itemPic") {
            cb(null, idir);
        }
        else if (file.fieldname === "toolPic") {
            cb(null, tdir);
        }
        else if (file.fieldname === "landPic") {
            cb(null, ldir);
        }

    },
    filename: function (req, file, cb) {
        cb(null, req.body.phone + file.originalname);
    }
})


const upload = multer({ storage: assign });



app.use(express.urlencoded({
    extended: true
}));
// app.use(express.json())


app.use(function (request, result, next) {
    result.setHeader("Access-Control-Allow-Origin", "*");
    next();
});


const connection = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "agriapp",
    multipleStatements: true
});


connection.connect(function (error) {
    console.log("mysql error:" + error);
});




// client side


app.get("/", (request, response) => {
    response.end("hai");
})



// get Items
app.get("/getItems", upload.none(), (request, response) => {
    console.log("Market Place", request.query);
    connection.query("Select sha2(t1.id,256) as id,t1.name as itemName,t1.price,t1.dateTime,t1.place,t1.district,t1.pic,t2.name as username,t2.phone from items t1 inner join users t2 on t1.user=t2.id where t1.name like ?", [`%${request.query.query}%`], function (error, result) {
        if (error == null) {
            console.log("market place done");
            response.send(JSON.stringify(result));
            response.end();
        }
        else {
            console.log("market place error");
            response.end("error");
        }
        console.log("market place mysql error: ", error);
    });
});



// add Items
app.post("/addItem", upload.single('itemPic'), (request, response) => {
    console.log("Add to Market Place");
    console.log(request.body);
    connection.query("Insert into items Values(NULL,?,?,?,?,now(),(Select id from users where phone=?),concat('http://192.168.18.2:3000/itemPics/',?))", [request.body.name, request.body.price, request.body.place, request.body.district, request.body.phone, request.file.filename], function (error, result) {
        if (error == null) {
            console.log("Add to Market place done");
            response.end("done");
        }
        else {
            console.log("add to market place error");
            response.end("error");
        }
        console.log("add to market place mysql error: ", error);
    });
});



// get tools
app.get("/getTools", upload.none(), (request, response) => {
    console.log("Rent a Tool");
    connection.query("Select sha2(t1.id,256) as id,t1.name as itemName,t1.price,t1.place,t1.district,t1.pic,t2.name as username,t2.phone from tools t1 inner join users t2 on t1.user=t2.id where t1.name like ?", [`%${request.query.query}%`], function (error, result) {
        if (error == null) {
            console.log("Rent a Tool done");
            response.send(JSON.stringify(result));
            response.end();
        }
        else {
            console.log("Rent a Tool error");
            response.end("error");
        }
        console.log("Rent a Tool mysql error: ", error);
    });
});



// add Tool
app.post("/addTool", upload.single('toolPic'), (request, response) => {
    console.log("Add to Market Place");
    connection.query("Insert into tools Values(NULL,?,?,?,?,(Select id from users where phone=?),concat('http://192.168.18.2:3000/toolPics/',?))", [request.body.name, request.body.price, request.body.place, request.body.district, request.body.phone, request.file.filename], function (error, result) {
        if (error == null) {
            console.log("Add to Market place done");
            response.end("done");
        }
        else {
            console.log("add to market place error");
            response.end("error");
        }
        console.log("add to market place mysql error: ", error);
    });
});



// get lands
app.get("/getLands", upload.none(), (request, response) => {
    console.log("Rent a land");
    connection.query("Select sha2(t1.id,256) as id,t1.name as landName,t1.price,t1.place,t1.district,t1.pic,t2.name as username,t2.phone from lands t1 inner join users t2 on t1.user=t2.id where t1.name like ?", [`%${request.query.query}%`], function (error, result) {
        if (error == null) {
            console.log("Rent a land done");
            response.send(JSON.stringify(result));
            response.end();
        }
        else {
            console.log("Rent a land error");
            response.end("error");
        }
        console.log("Rent a land mysql error: ", error);
    });
});



// add lands
app.post("/addLand", upload.single('landPic'), (request, response) => {
    console.log("Add land");
    connection.query("Insert into lands Values(NULL,?,?,?,?,(Select id from users where phone=?),concat('http://192.168.18.2:3000/landPics/',?))", [request.body.name, request.body.price, request.body.place, request.body.district, request.body.phone, request.file.filename], function (error, result) {
        if (error == null) {
            console.log("Add land done");
            response.end("done");
        }
        else {
            console.log("add land error");
            response.end("error");
        }
        console.log("add land mysql error: ", error);
    });
});


// signup
app.post("/signup", upload.none(), (request, response) => {
    console.log("Signup");
    if (otp[request.body.phone] == request.body.otp) {
        connection.query("Insert into users Values(NULL,?,?,?,?,sha2(?,256),now())", [request.body.name, request.body.phone, request.body.place, request.body.district, request.body.password], function (error, result) {
            if (error == null) {
                console.log("Signup done OTP:", otp[request.body.phone]);
                response.end("done");
            }
            else {
                console.log("Signup error");
                response.end("error");
            }
            console.log("Signup mysql error: ", error);
        });
    }
    else {
        response.end("otp error");
    }
});



// login
app.post("/login", upload.none(), (request, response) => {
    console.log("Login");
    connection.query("Select 0 as id from users where phone=? and password=sha2(?,256)", [request.body.phone, request.body.password], function (error, result) {
        console.log(result);
        if (error == null && result.length != 0) {
            console.log("Login done");
            response.end("done");
        }
        else {
            console.log("Login error");
            response.end("error");
        }
        console.log("Login mysql error: ", error);
    });
});


app.post("/getProfile", upload.none(), (request, response) => {
    console.log("get profile");
    connection.query("Select sha2(id,256) as id,name,place,district from users where phone=?", [request.body.phone], function (error, result) {
        if (error == null) {
            console.log("get Profile done:", JSON.stringify(result));
            response.end(JSON.stringify(result));
        }
        else {
            console.log("get profile error");
            response.end("error");
        }
        console.log("get profile mysql error: ", error);
    });
});


// edit profile
app.post("/editProfile", upload.none(), (request, response) => {
    console.log("edit profile");
    connection.query("Update users set name=?,phone=?,place=?,district=? where sha2(id,256) = ?", [request.body.name, request.body.phone, request.body.place, request.body.district, request.body.id], function (error, result) {
        if (error == null) {
            console.log("edit Profile done:");
            response.end("done");
        }
        else {
            console.log("edit profile error");
            response.end("error");
        }
        console.log("edit profile mysql error: ", error);
    });
});



// edit Password
app.post("/editPassword", upload.none(), (request, response) => {
    if (otp[request.body.phone] == request.body.otp) {
        console.log("edit password");
        connection.query("Update users set password=sha2(?,256) where phone = ?", [request.body.password, request.body.phone], function (error, result) {
            if (error == null) {
                console.log("edit Password done:");
                response.end("done");
            }
            else {
                console.log("edit password error");
                response.end("error");
            }
            console.log("edit password mysql error: ", error);
        });
    }
    else {
        response.end("otp error");
    }
});



// OTP Verification
app.post("/getOTP", upload.none(), (request, response) => {
    if (request.body.phone != null) {
        otp[request.body.phone] = Math.floor(Math.random() * 900000) + 100000;;
    }
    console.log(otp[request.body.phone]);
    if (request.body.phone != undefined) {

        var message = {
            app_id: "9a34fce0-8e58-42af-b1bf-217caa61de6f",
            name: Date.now().toString(),
            sms_from: "(307) 438-8637",
            contents: { "en": 'Your OTP is ' + otp[request.body.phone] },
            include_phone_numbers: ["+91" + request.body.phone],
        };

        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic NDdkZjBlYTUtMmE2Yi00NTMzLWJjNjUtMDliNDEyZWNmMzll"
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };


        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:\n", JSON.parse(data));
                if (JSON.parse(data)["error"] === undefined) {
                    console.log("done");
                }
                else {
                    console.log("error");
                }
            });
        });

        req.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
            response.end("error");
        });

        req.write(JSON.stringify(message));
        req.end();
    }
    else {
        response.end("No Authorization");
    }
});


// get user items
app.post("/getUserItems", upload.none(), (request, response) => {
    console.log("get user items");
    connection.query("Select sha2(t1.id,256) as id,t1.name,t1.price,t1.place,t1.district,t1.pic from items t1 inner join (Select * from users where phone=?) t2 on t1.user=t2.id where t1.name like ?", [request.body.phone, `%${request.body.query}%`], function (error, result) {
        if (error == null) {
            console.log("get user items done:");
            response.end(JSON.stringify(result));
        }
        else {
            console.log("get user items error");
            response.end("error");
        }
        console.log("get user items mysql error: ", error);
    });
});



// edit user item
app.post("/editUserItem", upload.none(), (request, response) => {
    console.log("edit user item");
    connection.query("Update items set name=?,price=?,place=?,district=? where sha2(id,256)=?", [request.body.name, request.body.price, request.body.place, request.body.district, request.body.id], function (error, result) {
        if (error == null) {
            console.log("get user items done:");
            response.end("done");
        }
        else {
            console.log("get user items error");
            response.end("error");
        }
        console.log("get user items mysql error: ", error);
    });
});



// get user tools
app.post("/getUserTools", upload.none(), (request, response) => {
    console.log("get user items");
    connection.query("Select sha2(t1.id,256) as id,t1.name,t1.price,t1.place,t1.district,t1.pic from tools t1 inner join (Select * from users where phone=?) t2 on t1.user=t2.id where t1.name like ?", [request.body.phone, `%${request.body.query}%`], function (error, result) {
        if (error == null) {
            console.log("get user tools done:");
            response.end(JSON.stringify(result));
        }
        else {
            console.log("get user tools error");
            response.end("error");
        }
        console.log("get user tools mysql error: ", error);
    });
});



// edit user tool
app.post("/editUserTool", upload.none(), (request, response) => {
    console.log("edit user item");
    connection.query("Update tools set name=?,price=?,place=?,district=? where sha2(id,256)=?", [request.body.name, request.body.price, request.body.place, request.body.district, request.body.id], function (error, result) {
        if (error == null) {
            console.log("edit user tools done:");
            response.end("done");
        }
        else {
            console.log("edit user tools error");
            response.end("error");
        }
        console.log("edit user tools mysql error: ", error);
    });
});



// get user lands
app.post("/getUserLands", upload.none(), (request, response) => {
    console.log("get user lands");
    connection.query("Select sha2(t1.id,256) as id,t1.name,t1.price,t1.place,t1.district,t1.pic from lands t1 inner join (Select * from users where phone=?) t2 on t1.user=t2.id where t1.name like ?", [request.body.phone, `%${request.body.query}%`], function (error, result) {
        if (error == null) {
            console.log("get user lands done:");
            response.end(JSON.stringify(result));
        }
        else {
            console.log("get user lands error");
            response.end("error");
        }
        console.log("get user lands mysql error: ", error);
    });
});



// edit user land
app.post("/editUserLand", upload.none(), (request, response) => {
    console.log("edit user land");
    connection.query("Update lands set name=?,price=?,place=?,district=? where sha2(id,256)=?", [request.body.name, request.body.price, request.body.place, request.body.district, request.body.id], function (error, result) {
        if (error == null) {
            console.log("edit user land done:");
            response.end("done");
        }
        else {
            console.log("edit user land error");
            response.end("error");
        }
        console.log("edit user land mysql error: ", error);
    });
});



// get messages
app.post("/getMessages", upload.none(), (request, response) => {
    console.log("get messages", request.body);
    var query = connection.query("select t1.id,COALESCE((Select 'You' from users where phone=? and id=t2.id),t2.name) as sender,t1.message,t1.dateTime from chat t1 inner join (Select id,name from users) t2 on t1.user=t2.id order by t1.id asc", [request.body.phone], function (error, result) {
        if (error == null) {
            console.log("get messages done:");
            response.end(JSON.stringify(result));
        }
        else {
            console.log("get messages error");
            response.end("error");
        }
        console.log("get messages mysql error: ", query.sql);
    });
});


// get messages
app.post("/analyticsInfo", upload.none(), (request, response) => {
    console.log(request.body);
    connection.query("Select district from users where phone=?", [request.body.phone], function (error, result) {
        if (error == null && result.length != 0) {
            console.log(result);
            connection.query("Insert into diseaseInfo(id,disease,district) Values ?", [JSON.parse(request.body.diseaseInfo).map(item => [null, item.disease, result[0]['district']])], function (error1, result1) {
                if (error1 == null) {
                    response.end("done");
                }
                else {
                    response.end("error");
                    console.log("error1", error1);
                }
            });
        }
        else {
            response.end("error");
            console.log("error", error);
        }
    });
});


// get weather
app.post("/getWeather", upload.none(), (request, response) => {
    console.log(request.body);
    connection.query("Select place,district from users where phone=?", [request.body.phone], function (error, result) {
        if (error == null && result.length != 0) {
            try {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${result[0]["district"]}&appid=3e49c92d00ef74b551e18e915b9c9fa7`;
                https.get(url, (resp) => {
                    let data = '';

                    // A chunk of data has been received.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        if (resp.statusCode == 200) {
                            response.end(data);
                        }
                        else {
                            response.end("error");
                        }
                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                    response.end("error");
                });
            } catch (e) {
                console.log(e);
                response.end("error parse");
            }
        }
        else {
            response.end("error");
            console.log("error", error);
        }
    });
});


// recommendation
app.post("/recommend", upload.none(), (request, response) => {

    const http = require("http");
    var data = "";

    const options = {
        hostname: '127.0.0.1',
        port: 3001,
        path: `/recommend?N=${request.body.N}&K=${request.body.K}&P=${request.body.P}&humidity=${request.body.humidity}&temperature=${request.body.temperature}&rainfall=${request.body.rainfall}&ph=${request.body.ph}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            data = data + d;
        })

        res.on('end', () => {
            if (res.statusCode == 200) {
                console.log(data);
                response.end(data);
            }
            else {
                response.end("error");
            }
        });
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
});

// gauthenticate
app.post("/authenticate", upload.none(), (request, response) => {
    console.log("authenticate");
    connection.query("Select 'done' as done from users where phone=?", [request.body.phone], function (error, result) {
        if (error == null && result.length != 0) {
            console.log(result);
            response.end("done");
        }
        else {
            console.log(error);
            response.end("error");
        }
        console.log("authenticate mysql error: ", error);
    });
});



// socket programming
io.on('connection', (socket) => {

    socket.on('connection', () => {
        console.log("user connected:" + socket.id);
    })


    socket.on('message', (data) => {
        console.log('message: ' + data["message"]);
        // socket.broadcast.emit('message', data);
        var date = new Date();
        connection.query('Insert into chat values(NULL,(Select id from users where phone=?),?,?); Select name from users where phone=?', [data["sender"], data["message"], date, data["sender"]], function (error, results) {
            if (error == null) {
                console.log(results[0]);
                console.log(results[1][0]["name"]);
                data["sender"] = results[1][0]["name"];
                data["dateTime"] = date;
                console.log(date);
                io.emit('message', data);
            }
            else {
                console.log(error);
            }
        });

    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



// admin side

// login
app.get('/login', upload.none(), function (request, response) {
    response.sendFile(__dirname + '/templates/login.html');
});

// validate
app.post('/validate', upload.none(), function (request, response) {
    console.log(request.body);
    if (request.body.phone == "1234567890" && request.body.password == "123") {
        response.cookie('status', "lsjfklsdkflsdkfldksf'", { maxAge: Date.now() + 900000, httpOnly: true });
        response.end("done");
    }
    else {
        response.end("error");
    }
});



// dashboard
app.get('/dashboard', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        response.sendFile(__dirname + '/templates/dashboardHome.html');
    else
        response.redirect("/login");
});


// dashboard district info
app.get('/district', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        response.sendFile(__dirname + '/templates/dashboardDistrict.html');
    else
        response.redirect("/login");
});


// dashboard notification info
app.get('/push', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        response.sendFile(__dirname + '/templates/dashboardPush.html');
    else
        response.redirect("/login");
});


// dashboard users info
app.get('/users', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        response.sendFile(__dirname + '/templates/dashboardUsers.html');
    else
        response.redirect("/login");
});


// dashboard items info
app.get('/items', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        response.sendFile(__dirname + '/templates/dashboardItems.html');
    else
        response.redirect("/login");
});


// dashboard tools info
app.get('/tools', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        response.sendFile(__dirname + '/templates/dashboardTools.html');
    else
        response.redirect("/login");
});


// dashboard lands info
app.get('/lands', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        response.sendFile(__dirname + '/templates/dashboardLands.html');
    else
        response.redirect("/login");
});

// get home info
app.get('/homeInfo', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        connection.query(`Select (Select count(id) from users where t1.date>=joinDate) as users, (Select count(id) from chat where t1.date=cast(dateTime as DATE)) as chats, t1.date from (select selected_date as 'date' from
            (select adddate((Select min(joinDate) from users), t4.i * 10000 + t3.i * 1000 + t2.i * 100 + t1.i * 10 + t0.i) selected_date from
            (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
            (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
                (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
                    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
                        (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
                                where selected_date <= CURDATE()) t1;
            select (Select count(id) from users where district=t1.district) as user,t1.district from (select * from (SELECT 'Kasargod' AS district
                                    UNION ALL
                                    SELECT 'Kannur' UNION ALL SELECT 'Wayanad' UNION ALL SELECT 'Palakkad' UNION ALL
                                    SELECT 'Kozhikode' UNION ALL SELECT 'Malappuram' UNION ALL SELECT 'Thrissur' UNION ALL
                                    SELECT 'Ernakulam' UNION ALL SELECT 'Idukki' UNION ALL SELECT 'Alappuzha' UNION ALL
                                    SELECT 'Kottayam' UNION ALL SELECT 'Pathanamthitta' UNION ALL SELECT 'Kollam' UNION ALL SELECT 'Thiruvananthapuram')t1)t1 order by user desc;
            Select count(id) as count from items;
            Select count(id) as count from tools;
            Select count(id) as count from lands;`, function (error, results) {
            if (error == null && results[0].length != 0 && results[1].length != 0 && results[2].length != 0 && results[3].length != 0 && results[4].length != 0) {
                response.end(JSON.stringify(results));
            }
            else {
                console.log(error);
                response.end("error");
            }
        });
    else
        response.end("No authorization");
});



// get district info
app.post('/districtInfo', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        connection.query('Select sha2(t1.id,256) as id,t2.disease,(Select count(id) from diseaseInfo where disease=t1.disease) as count from diseaseInfo t1 inner join diseases t2 on t1.disease=t2.id where t1.district=?', [request.body.district], function (error, results) {
            if (error == null) {
                response.end(JSON.stringify(results));
            }
            else {
                console.log(error);
            }
        });
    else
        response.end("No authorization");
});



// get users info
app.get('/usersInfo', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        connection.query('Select sha2(id,256) as id,name,phone,place,district,joinDate from users', function (error, results) {
            if (error == null) {
                response.end(JSON.stringify(results));
            }
            else {
                console.log(error);
            }
        });
    else
        response.end("No authorization");
});



// dashboard items info
app.get('/itemsInfo', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        connection.query('Select sha2(t1.id,256) as id,t1.name as itemName,t1.place,t1.pic,t2.name as name,t2.phone,t1.district from items t1 inner join users t2 on t1.user=t2.id;', function (error, results) {
            if (error == null) {
                response.end(JSON.stringify(results));
            }
            else {
                console.log(error);
            }
        });
    else
        response.end("No authorization");
});


// dashboard tools info
app.get('/toolsInfo', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        connection.query('Select sha2(t1.id,256) as id,t1.name as toolName,t1.place,t1.pic,t2.name as name,t2.phone,t1.district from tools t1 inner join users t2 on t1.user=t2.id;', function (error, results) {
            if (error == null) {
                response.end(JSON.stringify(results));
            }
            else {
                console.log(error);
            }
        });
    else
        response.end("No authorization");
});


// dashboard lands info
app.get('/landsInfo', upload.none(), function (request, response) {
    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'")
        connection.query('Select sha2(t1.id,256) as id,t1.name as landName,t1.place,t1.pic,t2.name as name,t2.phone,t1.district from lands t1 inner join users t2 on t1.user=t2.id;', function (error, results) {
            if (error == null) {
                response.end(JSON.stringify(results));
            }
            else {
                console.log(error);
            }
        });
    else
        response.end("No authorization");
});



// dashboard notify
app.post('/notify', upload.none(), function (request, response) {

    if (request.body.title != undefined && request.body.content != undefined && request.cookies["status"] == "lsjfklsdkflsdkfldksf'") {

        var message = {
            app_id: "9a34fce0-8e58-42af-b1bf-217caa61de6f",
            contents: { "en": request.body.content },
            headings: { "en": request.body.title },
            included_segments: ["Subscribed Users"],
        };

        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic NDdkZjBlYTUtMmE2Yi00NTMzLWJjNjUtMDliNDEyZWNmMzll"
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };


        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:\n", JSON.parse(data));
                connection.query('Insert into notifications Values(NULL,?,?,?,NOW(),?)', [request.body.label, request.body.title, request.body.content, JSON.parse(data)["error"] === undefined ? "success" : "failure"], function (error, results) { });
                if (JSON.parse(data)["error"] === undefined) {
                    response.end("done");
                }
                else {
                    response.end("error");
                }
            });
        });

        req.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
            response.end("error");
        });

        req.write(JSON.stringify(message));
        req.end();
    }
    else {
        response.end("No Authorization");
    }

});



// dashboard notication info
app.get('/notificationsInfo', upload.none(), function (request, response) {

    if (request.cookies["status"] == "lsjfklsdkflsdkfldksf'") {


        // var headers = {
        //     "Content-Type": "application/json; charset=utf-8",
        //     "Authorization": "Basic NDdkZjBlYTUtMmE2Yi00NTMzLWJjNjUtMDliNDEyZWNmMzll"
        // };

        // var options = {
        //     host: "onesignal.com",
        //     port: 443,
        //     path: "/api/v1/players?app_id=9a34fce0-8e58-42af-b1bf-217caa61de6f&offset=0",
        //     // path: "/api/v1/notifications?app_id=9a34fce0-8e58-42af-b1bf-217caa61de6f&offset=0",
        //     // path: "/api/v1/apps/9a34fce0-8e58-42af-b1bf-217caa61de6f/outcomes?outcome_names=os__click.count&outcome_platforms=0",
        //     method: "GET",
        //     headers: headers
        // };


        // const req = https.request(options, res => {
        //     console.log(`statusCode: ${res.statusCode}`);

        //     var data = '';

        //     res.on('data', chunk => {
        //         data += chunk;
        //     });

        //     res.on('end', () => {
        //         if (res.statusCode == 200) {
        //             response.end(data);
        //         }
        //         else {
        //             response.end("error");
        //         }
        //     });

        // })

        // req.on('error', error => {
        //     console.error(error);
        //     response.end("error");
        // })

        // req.end()

        connection.query(`Select (Select count(id) from notifications where status="success") as success, (Select count(id) from notifications where status="failure") as failure; 
                        Select label,title,content,DATE_FORMAT(dateTime,'%h:%i %p') as time, Date_Format(dateTime,' %d/%m/%Y') as date from notifications;
                        Select (Select count(id) from notifications where t1.date=cast(dateTime as DATE)) as notifications, t1.date from (select selected_date as 'date' from
                            (select adddate((Select min(joinDate) from users), t4.i * 10000 + t3.i * 1000 + t2.i * 100 + t1.i * 10 + t0.i) selected_date from
                            (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
                            (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
                                (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
                                    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
                                        (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
                                                where selected_date <= CURDATE()) t1;`, [request.body.label, request.body.title, request.body.content], function (error, results) {
            if (error == null) {
                response.end(JSON.stringify(results));
            }
            else {
                response.end("error");
            }
        });
    }
    else {
        response.end("No Authorization");
    }

});


// start the server
http.listen(3000, "192.168.18.46", function () {
    console.log("Listening on*:3000");
});