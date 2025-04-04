const getPostsWithDetails = () => [
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "userDetails",
    },
  },
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "post_id",
      as: "comments",
    },
  },
  {
    $addFields: {
      userDetails: { $arrayElemAt: ["$userDetails", 0] },
      comments: {
        $filter: {
          input: "$comments",
          as: "comment",
          cond: { $eq: ["$$comment.approved", true] },
        },
      },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "comments.user_id",
      foreignField: "_id",
      as: "commentUserDetails",
    },
  },
  {
    $addFields: {
      comments: {
        $map: {
          input: "$comments",
          as: "comment",
          in: {
            comment: "$$comment.comment",
            approved: "$$comment.approved",
            user: {
              username: {
                $getField: {
                  field: "username",
                  input: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$commentUserDetails",
                          as: "user",
                          cond: { $eq: ["$$user._id", "$$comment.user_id"] },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 1,
      title: 1,
      content: 1,
      image_url: 1,
      likes: 1,
      user: {
        username: "$userDetails.username",
        email: "$userDetails.email",
      },
      comments: 1,
    },
  },
  { $sort: { createdAt: -1 } },
];

export default getPostsWithDetails;
