module.exports = (mongoose) => {
	var schema = mongoose.Schema(
		{
			service: [],
			date: String,
			name: String,
			postedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		},
		{ timestamps: true }
	);

	schema.method("toJSON", function () {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});

	const Post = mongoose.model("post", schema);
	return Post;
};
