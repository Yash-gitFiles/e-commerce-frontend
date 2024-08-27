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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* admin panel */}
            <Route
              path="/adminPanel"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />

            {/* all products */}

            <Route
              path="adminPanel/allProducts"
              element={
                <AdminRoute>
                  <AllProducts />
                </AdminRoute>
              }
            />

            {/* allUsers */}

            <Route
              path="adminPanel/allUsers"
              element={
                <AdminRoute>
                  <AllUsers />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
