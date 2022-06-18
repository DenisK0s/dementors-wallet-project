import { useState, useLayoutEffect } from "react";

const queries = ["(min-width: 768px)", "(max-width: 767.9px)", "(min-width: 1280px)"];

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));

  const getValues = () => mediaQueryLists.map((mqlist) => mqlist.matches);

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.array.forEach((mqlist) => mqlist.addEventListener("change", handler));
    return () =>
      mediaQueryLists.array.forEach((mqlist) => mqlist.removeEventListener("change", handler));
  });

  return ["isMobile", "isTablet", "isDesctop"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {}
  );
};
