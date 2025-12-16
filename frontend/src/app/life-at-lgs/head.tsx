export default function Head() {
  return (
    <>
      <title>Life at LGS | Learners PU College</title>

      <meta
        name="description"
        content="Explore campus life at Learners PU College - achievements, events, facilities, sports, cultural activities, tours, excursions, and student success stories."
      />

      <meta
        name="keywords"
        content="life at PU college, campus life, PU college events, student activities, sports, cultural, facility tours, Learners PU College"
      />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content="Life at LGS | Learners PU College" />
      <meta
        property="og:description"
        content="Experience student life, facilities, events, achievements, and campus culture at Learners PU College, Vijayanagar."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/resources/student-achievers.jpg" />

      {/* Twitter Preview */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Life at LGS | Learners PU College" />
      <meta
        name="twitter:description"
        content="See our vibrant campus life, achievements and facilities."
      />
      <meta name="twitter:image" content="/resources/student-achievers.jpg" />

      {/* SEO Extras */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://yourdomain.com/life-at-lgs" />
    </>
  );
}
