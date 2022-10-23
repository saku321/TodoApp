const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
app.use(cors());
app.use(express.json());
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const dbConnect = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DB,

});
//luo tiketin databaseen
app.post('/createTicket', (req, res) => {

  
    const createStr = `CREATE TABLE IF NOT EXISTS ${ req.body.user} (id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, TodoOtsikko VARCHAR(255) NOT NULL, Otsikko VARCHAR(255) NOT NULL, Rivi1 VARCHAR(255), Rivi2 VARCHAR(255), Rivi3 VARCHAR(255), Rivi4 VARCHAR(255), Rivi5 VARCHAR(255), reg_date TIMESTAMP)`;

    dbConnect.query(createStr, (err, result) => {
        if (err) {
            res.send({ msg: "Tiketin luominen ei onnistunut!" });
        } if (!err) {

            const insertData = `INSERT INTO ${req.body.user} (TodoOtsikko,Otsikko,Rivi1,Rivi2,Rivi3,Rivi4,Rivi5) VALUES (?,?,?,?,?,?,?)`;
            dbConnect.query(insertData, [req.body.ticketTitle,req.body.Title,req.body.rivi1, req.body.rivi2, req.body.rivi3, req.body.rivi4, req.body.rivi5], (req, insertResult) => {
                if (!err) {
                    res.send({ msg: "Tiketti luotu",data:true });

                }
            });

        }
    });

});
//hakee kaikki todo tiketit databasesta

app.post('/getTickets', (req, res) => {

    const hae = `SELECT * FROM ${req.body.user}`;
    dbConnect.query(hae, (err, result) => {
        if (err) {
            res.send({msg:"Tunnuksella ei ole tiketteja",status:false})

        }
        if (result) {
            if (result.length > 0) {
                res.send({ data: result, status: true });

            } if (result.length == 0) {
                
                    res.send({ status: true });
                
            }
        }
    });

})
//poistaa tiketin databasesta eli merkkaa tehdyksi
app.post('/todoDone', (req, res) => {

    const search = `SELECT * FROM ${req.body.user} WHERE id=?`;
    const id = req.body.todoId;

    if (typeof id === 'number') {

        dbConnect.query(search, [id], (err, result) => {
            if (err) {
                res.send({ msg: "Jotain meni pieleen", status: false })

            }
            if (result) {

                if (result.length > 0) {
                    const deleteTodo = `DELETE FROM ${req.body.user} WHERE id=?`;
                    dbConnect.query(deleteTodo, [req.body.todoId], (err, row) => {
                        if (err) {
                            res.send({ msg: "Jotain meni pieleen", status: false });
                        } else {

                            res.send({ status: true });
                        }
                    });
                }

            }
        });
    } else {
        res.send({ msg: "Jotain meni pieleen", status: false })
    }

})

app.listen(3005, () => {
    console.log("serverrunning");
})
