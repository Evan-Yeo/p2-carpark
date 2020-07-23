const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spaceSchema = Schema({
	spaceNumber: {
		type: String,
		required: true,
	},
	spaceUsedBy: [
		{
			type: String,
			ref: 'Vehicle',
		},
	],
	//     isFilled: {
	//         type: Boolean,
	//         default: false,
	//     },
});

spaceSchema.methods.getName = function (i) {
	console.log('length', this.spaceUsedBy.length);
	console.log('i', this.spaceUsedBy[i]);
	// console.log(
	// 	this.spaceUsedBy[i] ? this.spaceUsedBy[i].carPlate : 'No plates defined'
	// );
	return `Lot: ${this.spaceNumber}  Car Plate: ${
		this.spaceUsedBy[i] ? this.spaceUsedBy[i].carPlate : 'No plates defined'
	}`;
};

const Space = mongoose.model('Space', spaceSchema);
module.exports = Space;
