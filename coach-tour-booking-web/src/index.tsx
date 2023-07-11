import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoot from './AppRoot';
import reportWebVitals from './reportWebVitals';
import "./normalize.css";
import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import "@fontsource/roboto/700.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Journeys from './pages/Journeys';
import Activities from './pages/Activities';
import Bookings from './pages/Bookings';
import Luggage from './pages/Luggage';
import Itenary from './pages/Itenary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot/>,
    children: [
      {
        path: "journeys",
        element: <Journeys/>
      },
      {
        path: "activities",
        element: <Activities/>
      },
      {
        path: "bookings",
        element: <Bookings/>
      },
      {
        path: "luggage",
        element: <Luggage/>
      },
      {
        path: "itenary",
        element: <Itenary/>
      }
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RouterProvider router={router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
