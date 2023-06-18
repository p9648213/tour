import Image from "next/image";

export default function Review({ tour }) {
  const stars = [1, 2, 3, 4, 5];
  const renderStar = (review) => {
    return (
      <>
        {stars.map((star) => {
          return (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className={`reviews__star reviews__star--${
                review.rating >= star ? "active" : "inactive"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          );
        })}
      </>
    );
  };

  const renderReview = tour.reviews.map((review, index) => {
    return (
      <div key={index} className="reviews__card">
        <div className="reviews__avatar">
          <Image
            src={`${
              review.user.photo === "default.webp"
                ? "/img/default.webp"
                : review.user.photo
            }`}
            alt={`review.user.name`}
            className="reviews__avatar-img"
            width={128}
            height={128}
            placeholder="empty"
          />
          <h6 className="reviews__user">{review.user.name}</h6>
        </div>
        <p className="reviews__text">{review.review}</p>
        <div className="reviews__rating">{renderStar(review)}</div>
      </div>
    );
  });

  return (
    <section className="section-reviews">
      <div className="reviews">{renderReview}</div>
    </section>
  );
}
