import Link from "next/link";
export default function CardFooter({ tour }) {
  return (
    <div className="card__footer">
      <p>
        <span className="card__footer-value">{tour.price} $</span>{" "}
        <span className="card__footer-text">per person</span>
      </p>
      <p className="card__ratings">
        <span className="card__footer-value">{tour.ratingsAverage} / 5</span>{" "}
        <span className="card__footer-text">rating</span>
      </p>
      <Link className="btn btn--blue btn--small" href={`/tours/${tour.slug}`}>
        Details
      </Link>
    </div>
  );
}
