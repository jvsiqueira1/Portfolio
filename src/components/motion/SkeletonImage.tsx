"use client";

import Image, { type ImageProps } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

// transitions.dev: skeleton-reveal. The capture's slot pulses (once, as in the recipe) and holds while the
// image loads, then the skeleton and the image cross-fade with the recipe's cross-blur. Both layers sit in the
// same box, so the swap never moves the layout.
// The server HTML (and the first client render) is the resting state: the capture whole and sharp, no skeleton,
// so it shows without JavaScript or before hydration. Only the client hides it, before its first paint, and only
// while the browser has no pixel of the image yet (an image already loaded or already painting partly never
// blinks). A failed image also ends the skeleton, so the alt text is not left behind it.
export default function SkeletonImage(props: ImageProps) {
  const contentRef = useRef<HTMLSpanElement>(null);
  const [pending, setPending] = useState(false);

  useLayoutEffect(() => {
    const image = contentRef.current?.querySelector("img");
    if (image && !image.complete && image.naturalWidth === 0) setPending(true);
  }, []);

  const reveal = () => setPending(false);

  return (
    <span className={`t-skel${pending ? " is-pending" : ""}`}>
      <span className="t-skel-skeleton" aria-hidden="true">
        <span className="t-skel-block" />
      </span>
      <span ref={contentRef} className="t-skel-content">
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes in with the props */}
        <Image {...props} onLoad={reveal} onError={reveal} />
      </span>
    </span>
  );
}
