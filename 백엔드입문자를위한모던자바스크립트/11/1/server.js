const dbCon = require("./db");
const express = require("express");
const app = express();

app.listen(4000, (req, res) => {
    console.log(`Sever Starting on 4000`);

    dbCon.getBoardList()
    .then((rows) => {
        rows.map((tuple) => {  
            console.log(tuple);
        });
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });
});