import CardHeader from "./CardHeader";
import CardDetails from "./CardDetails";
import CardFooter from "./CardFooter";

export default function TourCard({ tour }) {
  return (
    <div className="card">
      <CardHeader tour={tour} />
      <CardDetails tour={tour} />
      <CardFooter tour={tour} />
    </div>
  );
}
