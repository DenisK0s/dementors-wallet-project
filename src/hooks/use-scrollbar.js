import { useEffect } from "react";
import OverlayScrollbars from "overlayscrollbars";

const options = {
  scrollbars: {
    visibility: "auto",
    dragScrolling: true,
    clickScrolling: false,
    touchSupport: true,
    snapHandle: false,
  },
};

const useScrollbar = (root, hasScroll) => {
  useEffect(() => {
    let scrollbars;
    if (hasScroll) {
      scrollbars = OverlayScrollbars(root.current, options);
    }

    return () => {
      if (scrollbars) {
        scrollbars.destroy();
      }
    };
  }, [root, hasScroll]);
  return [];
};

export { useScrollbar };
