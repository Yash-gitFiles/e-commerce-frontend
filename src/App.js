import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import { store } from "./redux/store";
import AdminRoute from "./pages/adminPanel/AdminRoute.jsx";
import AdminPanel from "./pages/adminPanel/AdminPanel.jsx";
import AllProducts from "./pages/adminPanel/AllProducts.jsx";
import AllUsers from "./pages/adminPanel/AllUsers.jsx";
import AdminHome from "./pages/adminPanel/AdminHome.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route element={<AdminRoute />}>
              <Route path="adminPanel" element={<AdminPanel />}>
                <Route index element={<AdminHome />} />
                <Route path="allUsers" element={<AllUsers />} />
                <Route path="allProducts" element={<AllProducts />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
