import Image from "next/image";

export default function CardHeader({ tour }) {
  return (
    <div className="card__header">
      <div className="card__picture">
        <div className="card__picture-overlay">
          <Image
            src={tour.imageCover}
            className="card__picture-overlay"
            width={2000}
            height={1333}
            alt={tour.name}
            placeholder="empty"
          />
        </div>
      </div>
      <h3 className="heading-tertirary">
        <span>{tour.name}</span>
      </h3>
    </div>
  );
}
