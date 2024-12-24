import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import LogIn from "./pages/logIn/LogIn";
import Home from "./pages/home/MainHome";
const App = () => {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routs}></RouterProvider>
    </>
  );
};

export default App;
