import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
});



export const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);


