"use client";

const dictionary = {
  search: (
    <>
      <circle cx="8.5" cy="8.5" r="5.2" />
      <path d="m12.5 12.5 4 4" />
    </>
  ),
  heart: (
    <path d="M10 17.2S3.2 13.1 3.2 8.1A3.7 3.7 0 0 1 10 6.2a3.7 3.7 0 0 1 6.8 1.9c0 5-6.8 9.1-6.8 9.1Z" />
  ),
  download: <path d="M10 3v9M6.8 9.5 10 12.7l3.2-3.2M4 16.5h12" />,
  image: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="1" />
      <circle cx="7" cy="7" r="1" />
      <path d="m4 15 3.5-4 2.5 2.5 2-2 4 3.5" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="4" width="11" height="12" rx="1" />
      <path d="m14 8 3-2v8l-3-2M7 8.5v3l2.5-1.5L7 8.5Z" />
    </>
  ),
  bell: (
    <path d="M15.5 8a5.5 5.5 0 0 0-11 0c0 6-2.2 6.5-2.2 6.5h15.4S15.5 14 15.5 8ZM8 17h4" />
  ),
  chevron: <path d="m7 8 3 3 3-3" />,
  grid: (
    <>
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="12" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="12" width="5" height="5" rx="1" />
      <rect x="12" y="12" width="5" height="5" rx="1" />
    </>
  ),
};

export default function Icon({
  name,
}: {
  name:
    | "search"
    | "heart"
    | "download"
    | "image"
    | "video"
    | "bell"
    | "chevron"
    | "grid";
}) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {dictionary[name]}
    </svg>
  );
}
