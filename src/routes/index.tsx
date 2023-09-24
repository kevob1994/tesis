import LoaderModal from "components/LoaderModal";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
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
  EditProfileUser,
  ProfileUser,
} from "../pages";
import { StoreI } from "../utils/interfaces";
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect } from "react";
import { clientAxios } from "config/axios";

export const RoutesPath = () => {
  const auth = useSelector((state: StoreI) => state.auth);
  useEffect(() => {
    const fetchCsrf = async () => {
      //   try {
      //     const response = await clientAxios.get<any[]>(
      //       `https://backtesis-qzjx8.ondigitalocean.app/sanctum/csrf-cookie`
      //     );
      //      // Access cookies from the 'set-cookie' header in the response
      // const cookiesHeader = response.headers['set-cookie'];
      // 			console.log('cookiesHeader')
      // 			console.log(cookiesHeader)
      // // Split the 'set-cookie' header to extract individual cookies
      // const cookiesArray = cookiesHeader?.map(cookie => cookie.split(';')[0]);
      // // Now you have an array of cookies
      // console.log('Cookies:', cookiesArray);
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
    };
    fetchCsrf();
  }, []);

  return (
    <>
      {!auth.loading ? (
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
            path='edit-profile'
            element={
              <ProtectedRoute>
                <EditProfileUser />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile-user/:id'
            element={
              <ProtectedRoute>
                <ProfileUser />
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
            <Route path='forum/:id_forum' element={<ForumInfoPage />} />
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
      ) : (
        <LoaderModal visible={true} />
      )}
    </>
  );
};
