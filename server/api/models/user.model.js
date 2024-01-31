const bcrypt = require("bcrypt");
module.exports = (mongoose) => {
	var schema = mongoose.Schema(
		{
			firstName: String,
			lastName: String,
			emailAddress: String,
			password: String,
			phone: String,
			userType: String,
			dogName: { type: String, required: false },
			dogBreed: { type: String, required: false },
			services: [],
		},
		{ timestamps: true }
	);

	schema.method("toJSON", function () {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});

	schema.pre("save", async function (next) {
		if (!this.isModified("password")) return next();
		try {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
			return next();
		} catch (error) {
			return next(error);
		}
	});

	const User = mongoose.model("User", schema);
	return User;
};
