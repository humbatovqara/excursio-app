import React, { useCallback, useState } from "react";
// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useParams } from "react-router-dom";
// Redux
import { postReviews } from "../../redux/actions/Review";
import { authSlice } from "../../redux/reducers/AuthSlice";
// Icons
import { FaStar } from "react-icons/fa";

interface ReviewProps {
  onSubmit: (review: string, rating: number) => void;
  previousReviews: any;
}

const Review: React.FC<ReviewProps> = ({ onSubmit, previousReviews }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { onOpen } = authSlice.actions;
  const {
    auth: { loginModal, loginUser, getUserId },
  } = useAppSelector((state) => state);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    if (!loginUser?.is_success) {
      return dispatch(onOpen());
    }

    const sendData = {
      room_id: Number(id),
      stars: rating,
      comment: review,
    };

    dispatch(postReviews(sendData));
    onSubmit(review, rating);
    setReview("");
    setRating(0);
  };

  return (
    <div>
      {/* Previous */}
      {previousReviews?.result?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Previous Reviews</h2>
          {previousReviews?.result?.map((prevReview: any) => (
            <div key={prevReview.id} className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-lg">
                  User: {prevReview?.user?.full_name}
                </span>
                <div className="flex ml-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      className={`text-2xl ${
                        value <= prevReview.stars
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{prevReview.comment}</p>
            </div>
          ))}
        </div>
      )}
      <br />
      <hr />
      <br />
      {/* New Reviews */}
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <div className="flex items-center mb-4">
        <span className="text-lg">Your Rating:</span>
        <div className="flex ml-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              className={`cursor-pointer text-3xl ${
                value <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(value)}
            />
          ))}
        </div>
      </div>
      <textarea
        value={review}
        onChange={handleReviewChange}
        className="border border-gray-300 rounded p-2 h-32 w-full"
        placeholder="Write your review..."
      />
      <button
        onClick={handleSubmit}
        className="bg-teal-500 text-white rounded py-2 px-4 mt-4 hover:bg-teal-600"
      >
        Submit
      </button>
    </div>
  );
};

export default Review;
