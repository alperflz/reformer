export const courseSchema = (program, nearestCourse) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": program.title,
  "description": program.overview,
  "provider": {
    "@type": "Organization",
    "name": "Re:Form Akademi",
    "url": "https://www.reformakademi.com"
  },
  "hasCourseInstance": nearestCourse && {
    "@type": "CourseInstance",
    "startDate": nearestCourse.startDate,
    "location": {
      "@type": "Place",
      "name": nearestCourse.location
    }
  }
});
