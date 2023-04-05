import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ChooseUserModePage from "./pages/ChooseUserMode";
import store from "./store/store";
import SingleEventPage from "./pages/SingleEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "choose-user-mode", element: <ChooseUserModePage /> },
      { path: "event/:eventId", element: <SingleEventPage /> },
      { path: "logout" },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
