import CardData from "./CardData";

export default function CardDetails({ tour }) {
  return (
    <div className="card__details">
      <h4 className="card__sub-heading">{tour.duration}-day tour</h4>
      <p className="card__text">{tour.summary}</p>
      <CardData text={tour.startLocation.description} icon="map-pin" />
      <CardData
        text={new Date(tour.startDates[0]).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
        icon="calendar"
      />
      <CardData text={`${tour.locations.length} stops`} icon="flag" />
      <CardData text={`${tour.maxGroupSize} people`} icon="user" />
    </div>
  );
}
