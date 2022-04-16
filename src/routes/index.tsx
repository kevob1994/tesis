import { useSelector } from 'react-redux';
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
  ForumInfoPage,
} from '../pages';
import { StoreI } from '../utils/interfaces';
import { ProtectedRoute } from './ProtectedRoute';

export const RoutesPath = () => {
  const auth = useSelector((state: StoreI) => state.auth);
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <ListCoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='create-course'
        element={
          <ProtectedRoute>
            <CreateCoursePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='edit-course/:id'
        element={
          <ProtectedRoute>
            <CreateCoursePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='home/:id'
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route path='course-program' element={<CourseProgramPage />} />
        <Route path='evaluation-plan' element={<EvaluationPlanPage />} />
        <Route path='calendar' element={<CalendarPage />} />
        <Route path='chat' element={<ChatPage />} />
        <Route path='forum' element={<ForumRoomPage />} />
        <Route path='forum/:id' element={<ForumInfoPage />} />
        <Route path='live-classes' element={<LiveClassesPage />} />
        <Route path='library' element={<LibraryPage />} />
        <Route path='tasks' element={<TasksPage />} />
        <Route path='notes' element={<NotesPages />} />
      </Route>
      <Route
        path='*'
        element={
          <ProtectedRoute>
            <p>There's nothing here: 404!</p>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
