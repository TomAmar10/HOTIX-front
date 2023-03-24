import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/Authentication";
import BuyerPage from "./pages/Buyer";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import SellOrBuyPage from "./pages/SellOrBuy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "logout" },
      { path: "sell-or-buy", element: <SellOrBuyPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "buyer", element: <BuyerPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
