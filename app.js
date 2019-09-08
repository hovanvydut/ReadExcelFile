const mongoose = require("mongoose");
const readXlsxFile = require("read-excel-file/node");

mongoose.connect(
	"mongodb://19clcdt4:123456abc@ds023088.mlab.com:23088/19clcdt4",
	{
		useNewUrlParser: true
	}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("Connect to Database successfully!");
});

const userShema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	linkFb: String
});

let userModel = mongoose.model("user", userShema);

let data = [];
readXlsxFile(`${__dirname}/Book1.xlsx`).then(rows => {
	// `rows` is an array of rows
	// each row being an array of cells.

	rows.forEach(row => {
		let doc = new userModel({
			name: row[2],
			phone: "0" + row[5],
			email: row[1],
			linkFb: row[4]
		});
		doc.save().then(val => console.log(val));
	});
});
