"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "./Select";
import SearchBar from "./SearchBar";

export default function Filter({
  selectTypeOptions,
  selectBehaviorOptions,
  defaultSearchTerm,
  defaultPage,
}) {
  const [typeOption, setTypeOption] = useState(selectTypeOptions.default);
  const [behaviorOption, setBehaviorOption] = useState(
    selectBehaviorOptions.default
  );

  const router = useRouter();

  const onTypeOptionChange = (option) => {
    setTypeOption(option);
    router.push(
      `/${defaultPage !== 1 ? `?page=${defaultPage}&` : "?"}${option.value}=${
        selectBehaviorOptions.default.value
      }${defaultSearchTerm !== "" ? `&search=${defaultSearchTerm}` : ""}`
    );
  };

  const onBehaviorOptionChange = (option) => {
    setBehaviorOption(option);
    router.push(
      `/${defaultPage !== 1 ? `?page=${defaultPage}&` : "?"}${
        selectTypeOptions.default.value
      }=${option.value}${
        defaultSearchTerm !== "" ? `&search=${defaultSearchTerm}` : ""
      }`
    );
  };

  const onSearchSubmit = (searchTerm) => {
    if (searchTerm !== defaultSearchTerm) {
      router.push(
        `/${defaultPage !== 1 ? `?page=${defaultPage}&` : "?"}${
          selectTypeOptions.default.value
        }=${selectBehaviorOptions.default.value}${
          searchTerm !== "" ? `&search=${searchTerm}` : ""
        }`
      );
    }
  };

  useEffect(() => {
    if (selectTypeOptions.default !== typeOption) {
      setTypeOption(selectTypeOptions.default);
    }

    if (selectBehaviorOptions.default !== behaviorOption) {
      setBehaviorOption(selectBehaviorOptions.default);
    }
  }, [selectTypeOptions.default, selectBehaviorOptions.default]);

  return (
    <>
      <SearchBar
        defaultSearchTerm={defaultSearchTerm}
        onSearchSubmit={onSearchSubmit}
      />

      <Select
        options={selectTypeOptions.options}
        value={typeOption}
        clearable={false}
        multiple={false}
        onChange={(o) => onTypeOptionChange(o)}
      />

      <Select
        options={selectBehaviorOptions.options}
        value={behaviorOption}
        clearable={false}
        multiple={false}
        onChange={(o) => onBehaviorOptionChange(o)}
      />
    </>
  );
}
