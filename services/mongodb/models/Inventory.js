const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema(
	{
		images: [{ type: String, }],
		itemName: {
			type: String,
			unique: true,
			required: true,
		},
		category: {
			type: String,
		},
		itemCode: {
			type: Number,
			required: true,
			unique: true,
		},
		stockQuantity: {
			type: Number,
			default: 0,
			required: true,
		},
		stockOnHold: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			required: true,
		},
		unit: {
			type: String,
			required: true,
		},
		purchasePrice: {
			type: Number,
			default: 0,
			required: true,
		},
		lowQuantity: {
			type: Number,
			required: true,
		},
		gst: {
			type: Number,
			required: true,
		},
		inclusive: {
			type: Boolean,
			required: true,
		},
		asOfDate: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Inventory', InventorySchema);
