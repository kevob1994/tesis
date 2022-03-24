import { Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  HomePage,
  ListCoursesPage,
  CourseProgramPage,
  EvaluationPlanPage,
  CalendarPage,
  ChatPage,
  ForumRoomPage,
  LiveClassesPage,
  LibraryPage,
  TasksPage,
  NotesPages,
  CreateCoursePage,
} from '../pages';

export const RoutesPath = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='/' element={<ListCoursesPage />} />
      <Route path='create-course' element={<CreateCoursePage />} />
      <Route path='edit-course/:id' element={<CreateCoursePage />} />
      <Route path='home/:id' element={<HomePage />}>
        <Route path='course-program' element={<CourseProgramPage />} />
        <Route path='evaluation-plan' element={<EvaluationPlanPage />} />
        <Route path='calendar' element={<CalendarPage />} />
        <Route path='chat' element={<ChatPage />} />
        <Route path='forum' element={<ForumRoomPage />} />
        <Route path='live-classes' element={<LiveClassesPage />} />
        <Route path='library' element={<LibraryPage />} />
        <Route path='tasks' element={<TasksPage />} />
        <Route path='notes' element={<NotesPages />} />
      </Route>
    </Routes>
  );
};
