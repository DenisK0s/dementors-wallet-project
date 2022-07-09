import { useState, useLayoutEffect } from "react";

const queries = [
  "(max-width: 767.9px)",
  "(min-width: 768px) and (max-width: 1279px)",
  "(min-width: 1280px)",
];

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map((query) => matchMedia(query));

  const getValues = () => mediaQueryLists.map((mqlist) => mqlist.matches);

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((mqlist) => mqlist.addEventListener("change", handler));
    return () => mediaQueryLists.forEach((mqlist) => mqlist.removeEventListener("change", handler));
  });

  return ["isMobile", "isTablet", "isDesctop"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {}
  );
};
