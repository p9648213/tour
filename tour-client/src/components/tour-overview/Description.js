import Image from "next/image";
import OverviewBox from "./OverviewBox";

export default function Description({ tour }) {
  const date = new Date(tour.startDates[0]).toLocaleString("en-us", {
    month: "long",
    year: "numeric",
    day: "2-digit",
  });

  const paragraphs = tour.description.split("\n");

  let renderParagraphs = paragraphs.map((p, index) => {
    return (
      <p className="description__text" key={index}>
        {p}
      </p>
    );
  });

  let renderTourGuides = tour.guides.map((guide, index) => {
    return (
      <div key={index} className="overview-box__detail">
        <Image
          className="overview-box__img"
          src={`${
            guide.photo === "default.webp" ? "/img/default.webp" : guide.photo
          }`}
          alt={guide.name}
          width={128}
          height={128}
          placeholder="empty"
        />
        {guide.role === "lead-guide" ? (
          <span className="overview-box__label">Lead guide</span>
        ) : (
          <span className="overview-box__label">Tour guide</span>
        )}
        <span className="overview-box__text">{guide.name}</span>
      </div>
    );
  });

  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <OverviewBox label="Next date" text={date} icon="calendar" />
            <OverviewBox
              label="Difficulty"
              text={tour.difficulty}
              icon="trending-up"
            />
            <OverviewBox
              label="Participants"
              text={`${tour.maxGroupSize} people`}
              icon="user"
            />
            <OverviewBox
              label="Rating"
              text={`${tour.ratingsAverage} / 5`}
              icon="star"
            />
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {renderTourGuides}
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>
        {renderParagraphs}
      </div>
    </section>
  );
}
