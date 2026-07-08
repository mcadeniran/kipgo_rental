"use client";

import {useCallback, useEffect, useRef} from "react";

export interface LoadMoreTriggerProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
}

export default function LoadMoreTrigger({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: LoadMoreTriggerProps) {

  const observer = useRef<IntersectionObserver | null>(null);

  const triggerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (
        isFetchingNextPage ||
        !hasNextPage
      ) {
        return;
      }

      observer.current?.disconnect();

      observer.current =
        new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              fetchNextPage();
            }
          },
          {
            rootMargin: "300px",
          },
        );

      if (node) {
        observer.current.observe(node);
      }
    },
    [
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    ],
  );


  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return (
    <div
      ref={triggerRef}
      className="h-8 w-full"
    />
  );
}