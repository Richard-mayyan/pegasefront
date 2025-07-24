import AIAssistantPanel from "./ai-assistant-panel";
import CourseHeader from "./course-header";
import CourseSidebar from "./course-sidebar";
import LessonPlayer from "./lesson-player";

// <CourseHeader />

export default function CoursePlayerLayout() {
  return (
    <div className="flex">
      <div className="">
        <CourseHeader />

        <div className="flex">
          <div className="flex h-screen overflow-hidden">
            <CourseSidebar />
            <div className="flex flex-col flex-1">
              <div className="flex flex-1 overflow-hidden">
                <LessonPlayer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AIAssistantPanel />
    </div>
  );
}
