import ReactDOM from 'react-dom/client';
import AppRoot from './AppRoot';
import reportWebVitals from './reportWebVitals';
import "./normalize.css";
import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import "@fontsource/roboto/700.css";
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Routes from './configuration/Routes';
import LookupService from './services/LookupService';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot/>,
    children: [
      ...Routes.map(route => {
        return {
          path: route.attr.pathName,
          element: route.attr.component,
        } as RouteObject
      })
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