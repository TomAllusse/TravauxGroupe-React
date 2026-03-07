import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router";
import QuizzContextProvider from "./contexts/QuizzContextProvider";
import "./index.css";
import Error404 from "./pages/Error404";
import Index from "./pages/Index";
import Themes from "./pages/Themes";
import Quizz from "./pages/Quizz";

const router = createBrowserRouter([
    { path: "/", Component: Index },
    { path: "/themes", Component: Themes },
    { path: "/quizz", Component: Quizz },
    { path: "*", Component: Error404 },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizzContextProvider>
      <RouterProvider router={router} />
    </QuizzContextProvider>
  </StrictMode>,
)
