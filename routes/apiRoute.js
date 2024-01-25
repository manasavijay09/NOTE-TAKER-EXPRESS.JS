const fs = require('fs');
let db = require("../db/db.json")


// routing
module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        db = JSON.parse(fs.readFileSync("./db/db.json")) || []
        res.json(db)
    });

    // GET * should return the index.html file.
    app.post('/api/notes', (req, res) => {
        console.log(req.body) // data from user(front end)
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Math.floor(Math.random() * 19999)//new id creating with math

        }
        db.push(newNote)
        fs.writeFileSync("./db/db.json", JSON.stringify(db), function (error) {
            if (error) throw error
        })
        res.json(db)
    })

    app.delete('/api/notes/:id', (req, res) => {
        console.log("delete", req.params.id)
        let tempDB = []
        for (let i = 0; i < db.length; i++) {
            if (db[i].id != req.params.id) {
                tempDB.push(db[i])
            }
        }
        db=tempDB
        fs.writeFileSync("./db/db.json", JSON.stringify(db), function (error) {
            if (error) throw error
        })
        res.json(db)
    })
}
