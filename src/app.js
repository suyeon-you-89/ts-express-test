"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("dotenv/config");
var body_parser_1 = require("body-parser");
var _1 = require(".");
var connect_1 = require("./connect");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('TS App is Running');
});
var PORT = process.env.PORT;
var db = 'mongodb://localhost:27017/test';
(0, connect_1.default)({ db: db });
(0, _1.default)({ app: app });
app.listen(PORT, function () {
    console.log("server is running on PORT ".concat(PORT));
});
