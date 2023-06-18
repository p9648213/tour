import { fetchAllTour } from "@/utils/tour-helper";

import TourCard from "../tour-card/TourCard";
import Pagination from "@/components/shared/Pagination";

export default async function AllTours({
  queryParams,
  defaultPage,
  defaultLimit,
}) {
  const res = await fetchAllTour(queryParams);

  if (res.status === "fail") {
    throw new Error(res.message);
  }

  const tourData = res.data.data;

  const totalTour = res.totalDocsBeforePaginate;

  let content = tourData.map((tour) => {
    return <TourCard key={tour.id} tour={tour} />;
  });

  return (
    <>
      <div className="card-container">{content}</div>
      <Pagination
        totalData={totalTour}
        defaultPage={defaultPage}
        defaultLimit={defaultLimit}
        siblings={1}
      />
      ;
    </>
  );
}
