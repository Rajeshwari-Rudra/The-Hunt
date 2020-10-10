const express=require('express')
const api=express.Router()
const Model=require('../models/user.js')
app.get("/api/user", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": rows
      })
    });
  });
  
  
  
  app.post("/api/user/", (req, res, next) => {
    var errors = []
    if (!req.body.password) {
      errors.push("No password specified");
    }
    if (!req.body.email) {
      errors.push("No email specified");
    }
    if (errors.length) {
      res.status(400).json({ "error": errors.join(",") });
      return;
    }
    var data = {
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password)
    }
    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params = [data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "success",
        "data": data,
        "id": this.lastID
      })
    });
  })
  
  
  
  app.patch("/api/user/:id", (req, res, next) => {
    var data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password ? md5(req.body.password) : undefined
    }
    db.run(
      `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
      [data.name, data.email, data.password, req.params.id],
      (err, result) => {
        if (err) {
          res.status(400).json({ "error": res.message })
          return;
        }
        res.json({
          message: "success",
          data: data
        })
      });
  })
  
  
  app.delete("/api/user/:id", (req, res, next) => {
    db.run(
      'DELETE FROM user WHERE id = ?',
      req.params.id,
      function (err, result) {
        if (err) {
          res.status(400).json({ "error": res.message })
          return;
        }
        res.json({ "message": "deleted", rows: this.changes })
      });
  })
  