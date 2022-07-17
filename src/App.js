import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Files from "./Pages/Files";

import "./custom.css"
const App = (props) => {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route exact path="/upload-file" element={<Files/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App