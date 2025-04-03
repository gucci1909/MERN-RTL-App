const addCommentController = async (req, res) => {
  //   try {
  //     const posts = await postModel.aggregate([
  //       {
  //         $match: { deletedAt: null }, // Exclude soft-deleted posts
  //       },
  //       {
  //         $lookup: {
  //           from: "users", // Assuming 'users' is the collection name
  //           localField: "user",
  //           foreignField: "_id",
  //           as: "userDetails",
  //         },
  //       },
  //       {
  //         $unwind: "$userDetails", // Convert userDetails array into an object
  //       },
  //       {
  //         $lookup: {
  //           from: "likes",
  //           localField: "_id",
  //           foreignField: "post",
  //           as: "likes",
  //         },
  //       },
  //       {
  //         $addFields: {
  //           totalLikes: {
  //             $size: {
  //               $filter: {
  //                 input: "$likes",
  //                 as: "like",
  //                 cond: { $eq: ["$$like.like", true] }, // Count only likes
  //               },
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $project: {
  //           "userDetails.password": 0, // Hide sensitive user data
  //           likes: 0, // Exclude detailed like data
  //           __v: 0,
  //         },
  //       },
  //     ]);

  //     return res.status(200).json(posts);
  //   } catch (error) {
  //     return res.status(500).json({ message: "Internal server error", error });
  //   }

  res.send(ok);
};

const approveCommentController = async (req, res) => {
  //   try {
  //     const { title, content, image_url } = req.body;
  //     const user_id = req.user.id;

  //     let uploadedImageUrl = image_url || "";

  //     // Upload image to Cloudinary if needed
  //     if (req.file) {
  //       const uploadResult = await cloudinary.uploader.upload(req.file.path, {
  //         folder: "posts",
  //       });
  //       uploadedImageUrl = uploadResult.secure_url;
  //     }

  //     // Create the post in the database
  //     const newPost = new postModel({
  //       title,
  //       content,
  //       user: user_id,
  //       image_url: uploadedImageUrl,
  //     });
  //     await newPost.save();

  //     // Publish the post to RabbitMQ for background processing
  //     publishToQueue({ postId: newPost._id, userId: user_id });

  //     return res
  //       .status(201)
  //       .json({ message: "Post created successfully", post: newPost });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Internal server error", error });
  //   }
  res.send(ok);
};

export { addCommentController, approveCommentController };
