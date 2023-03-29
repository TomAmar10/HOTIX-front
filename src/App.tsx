import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/Authentication";
import BuyerPage from "./pages/Buyer";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import SellOrBuyPage from "./pages/SellOrBuy";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "sell-or-buy", element: <SellOrBuyPage /> },
      { path: "buyer", element: <BuyerPage /> },
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
