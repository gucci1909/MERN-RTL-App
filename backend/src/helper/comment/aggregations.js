const getPendingCommentAggregation = () => [
  { $match: { approved: false } },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user_details",
    },
  },
  {
    $unwind: {
      path: "$user_details",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      _id: 1,
      comment: 1,
      createdAt: 1,
      user_id: 1,
      post_id: 1,
      "user_details.username": 1,
      "user_details.email": 1,
    },
  },
  { $sort: { createdAt: -1 } },
];

export { getPendingCommentAggregation };
