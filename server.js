var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/ContactManager");
var Schema = mongoose.Schema;
var ContactsSchema = new Schema({
    name: String,
    email: String,
    tel: String
});
var Contact = mongoose.model('contacts', ContactsSchema);

/*Contact.find({}, function(err, docs) {
    console.log(docs);
});
*/
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/getContacts', function(req, res) {
    Contact.find({}, function(err, docs) {
        res.send({ data: docs });
    });
});

app.post('/getContacts', function(req, res) {
    var myContact = new Contact({
        name: req.body[0].value,
        email: req.body[1].value,
        tel: req.body[2].value
    });
    myContact.save(
        function(err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        }
    );
});
app.put('/getContacts', function(req, res) {
    var myContact = new Contact({
        name: req.body[0].value,
        email: req.body[1].value,
        tel: req.body[2].value
    });
    myContact.save(
        function(err) {
            if (err) {
                res.send({ status: false });
            } else {
                res.send({ status: true });
            }
        }
    );
    console.log(req.body);
    Contact.findOne({ email: req.query.id }, function(err, doc) {
        doc.name = req.body[0].value;
        doc.email = req.body[1].value;
        doc.tel = req.body[2].value;
        doc.save();
    });
    res.send({ status: true });
});
app.delete('/getContacts', function(req, res) {
    console.log(req.query.id);
    console.log("delete");
    Contact.find({ email: req.query.id }).remove(function(err) {
        if (!err) {
            res.send("ok");
        }
    });
    var myContact = new Contact({
        name: req.body[0].value,
        email: req.body[1].value,
        tel: req.body[2].value
    });
    myContact.save(
        function(err) {
            if (err) {
                res.send("new contact was not added");
            } else {
                res.send("new contact was added");
            }
        }
    );
});

app.listen(1000, function() {
    console.log("The server started 1000")
});