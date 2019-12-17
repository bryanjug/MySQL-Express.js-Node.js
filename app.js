//nodemon to start MySQL server
//npm init for package json
//install mysql:
//npm install --save mysql express
//updates node.js after every save:
//npm install -g nodemon

const express = require('express');
const mysql = require('mysql');

//Create connection
//phpmyadmin user login
//create new log in for official log in
//find out how to hash password
const db = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password    :   '',
    database: "nodemysql"
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected...');
});


const app = express();
//create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});

//create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';

    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});

//insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

//select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

//select single post
//db.escape + mysql.escape prevents SQL injections
app.get('/getpost/:id', (req, res) => {
    let sql = 'SELECT * FROM posts WHERE id = ' + db.escape(req.params.id);
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

//Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = 'UPDATE posts SET title = ' + db.escape(newTitle) + ' WHERE id = ' + db.escape(req.params.id);
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

//delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = 'DELETE FROM posts WHERE id = ' + db.escape(req.params.id);
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});