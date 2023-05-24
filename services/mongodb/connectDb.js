require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.DB_URL;

const connectDb = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log('Connected to the database......');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDb;
