
import './App.css'
import { RouterProvider, createHashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Erorr from "./components/Erorr/Erorr";
import Categories from './components/Categories/Categories';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AboutUs from './components/AboutUs/AboutUs';
import ContentUs from './components/ContentUs/ContentUs';
import PageShorts from './components/Pages/PageShorts/PageShorts';
import PageTshirts from './components/Pages/PageTshirts/PageTshirts';
let routering = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/AboutUs", element: <AboutUs /> },
      { path: "/ContentUs", element: <ContentUs /> },
      { path: "/Categories", element: <Categories /> },
      { path: "/Shorts", element: <PageShorts /> },
      { path: "/Tshirts", element: <PageTshirts /> },
      { path: "*", element: <Erorr /> },
    ],
  },
]);
function App() {
  return (<>
    <HelmetProvider>
      <RouterProvider router={routering}>
      </RouterProvider>
    </HelmetProvider>
  </>)
}

export default App
