import { Suspense } from "react";
import AllTours from "@/components/all-tours/AllTours";
import Filter from "@/components/shared/Filter";

export default function Home({ searchParams }) {
  const selectTypeOptions = [
    { value: "createdAt", label: "New Tour" },
    { value: "price", label: "Price" },
    { value: "ratingsAverage", label: "Rating" },
    { value: "duration", label: "Duration" },
  ];

  const selectBehaviorOptions = [
    { value: "asc", label: "Ascending" },
    { value: "des", label: "Descending" },
  ];

  let defaultTypeOption = selectTypeOptions[0];
  let defaultBehaviorOption = selectBehaviorOptions[0];
  let defaultSearchTerm = "";
  let defaultPage = 1;
  let defaultLimit = 6;

  const getTypeOption = (function () {
    for (const option of selectTypeOptions) {
      for (const key of Object.keys(searchParams)) {
        if (key.includes(option.value)) {
          return {
            defaultTypeOption: option,
            behaviorKey: searchParams[key],
          };
        }
      }
    }
  })();

  if (getTypeOption) {
    defaultTypeOption = getTypeOption.defaultTypeOption;

    let checkBehaviorKey = Array.isArray(getTypeOption.behaviorKey)
      ? getTypeOption.behaviorKey[0]
      : getTypeOption.behaviorKey;

    for (const option of selectBehaviorOptions) {
      if (option.value === checkBehaviorKey) {
        defaultBehaviorOption = option;
        break;
      }
    }
  }

  for (const key of Object.keys(searchParams)) {
    if (key === "search") {
      defaultSearchTerm = Array.isArray(searchParams[key])
        ? searchParams[key][0]
        : searchParams[key];
    }
    if (key === "page") {
      defaultPage = Array.isArray(searchParams[key])
        ? searchParams[key][0]
        : searchParams[key];

      defaultPage = parseInt(defaultPage);

      if (isNaN(defaultPage)) {
        defaultPage = 1;
      }
    }
  }

  const sortString =
    defaultBehaviorOption.value === "asc"
      ? defaultTypeOption.value
      : `-${defaultTypeOption.value}`;

  const queryParams = {
    sortString,
    searchTerm: defaultSearchTerm,
    page: defaultPage,
    limit: defaultLimit,
  };

  return (
    <main className="main">
      <div className="filter-container">
        <Filter
          selectTypeOptions={{
            name: "type",
            options: selectTypeOptions,
            default: defaultTypeOption,
          }}
          selectBehaviorOptions={{
            name: "behavior",
            options: selectBehaviorOptions,
            default: defaultBehaviorOption,
          }}
          defaultSearchTerm={defaultSearchTerm}
          defaultPage={defaultPage}
        />
      </div>

      <Suspense
        fallback={
          <div className="loading-container">
            <h1 className="loading">Loading...</h1>
          </div>
        }
      >
        <AllTours
          queryParams={queryParams}
          defaultPage={defaultPage}
          defaultLimit={defaultLimit}
        />
      </Suspense>
    </main>
  );
}
