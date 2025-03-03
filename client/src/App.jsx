import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Rootlayout from "./layouts/Rootlayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ResultDisplay from "./pages/ResultDisplay";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/result/:id" element={<ResultDisplay />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
