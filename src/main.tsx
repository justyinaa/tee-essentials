import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from './redux/store/store.ts';
import ShopContextProvider from "./context/ShopContext.tsx";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import Homepage from "./pages/Homepage.tsx";
// import Products from "./pages/Products.tsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route index={true} element={<Homepage />} />
//       <Route path="products/:slug" element={<Products />} />
//       // {/* ... etc. */}
//     </Route>
//   )
// );

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//      <Provider store={store}>
//       <App />
//    </Provider> 
    
//   </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </Provider>
  </React.StrictMode>
);
