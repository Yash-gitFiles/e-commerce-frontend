// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Layout from "./layout/Layout";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import { Provider, useSelector } from "react-redux";
// import { store } from "./redux/store";
// import UserProfile from "./pages/UserProfile";

// function App() {
//   const user = useSelector((state) => state.userSlices.user);

//   return (
//     <BrowserRouter>
//       <Provider store={store}>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/login" element={<Login />} />
//             {user && <Route path="/profile" element={<UserProfile />} />}
//           </Route>
//         </Routes>
//       </Provider>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./layout/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
