import CourseCard from "./course-card";

export default function CourseGrid() {
  const courses = [
    {
      imageUrl:
        "https://images.pexels.com/photos/6923373/pexels-photo-6923373.jpeg",
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      progress: 15,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/6923373/pexels-photo-6923373.jpeg",
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      progress: 15,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/6923373/pexels-photo-6923373.jpeg",
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      progress: 15,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/6923373/pexels-photo-6923373.jpeg",
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      progress: 15,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/6923373/pexels-photo-6923373.jpeg",
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      progress: 15,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            imageUrl={course.imageUrl}
            title={course.title}
            dateAdded={course.dateAdded}
            progress={course.progress}
          />
        ))}
      </div>
      <div className="mt-8">
        <div className="h-3 w-3 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
