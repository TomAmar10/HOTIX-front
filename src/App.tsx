import { Provider } from "react-redux";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ChooseUserModePage from "./pages/ChooseUserMode";
import store from "./store/store";
import { lazy, Suspense } from "react";
import { appRoutes } from "./utils/config";
import ProfileRootLayout from "./pages/ProfileRoot";
import ProfileTicketsPage from "./pages/ProfileTickets";
import ProfileOffersPage from "./pages/ProfileOffers";
const SingleEventPage = lazy(() => import("./pages/SingleEvent"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: appRoutes.auth, element: <AuthPage /> },
      { path: appRoutes.chooseMode, element: <ChooseUserModePage /> },
      {
        path: "event/:eventId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <SingleEventPage />
          </Suspense>
        ),
      },
      {
        path: "profile/:userId",
        element: <ProfileRootLayout />,
        children: [
          { index: true, element: <Navigate to={"tickets"} /> },
          { path: "tickets", element: <ProfileTicketsPage /> },
          { path: "offers", element: <ProfileOffersPage /> },
        ],
      },
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
