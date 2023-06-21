import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePageComponent from "./pages/Home";
import SearchPageComponent from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageComponent />,
  },
  {
    path: "/search",
    element: <SearchPageComponent />,
  },
]);

function App() {
  return (
    <div className="App">
      <div className="component-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
