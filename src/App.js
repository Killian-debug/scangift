import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import HomeOld from "./views/Home.old.js";
import LandingPage from "./views/LandingPage.js";
import ScanPage from "./views/ScanPage.js";

const App = () => {

  return (
    
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="/homeold" element={<HomeOld />}>
              {" "}
            </Route>
            <Route path="/scanpage" element={<ScanPage />}>
              {" "}
            </Route>
            <Route path="/scangift" element={<LandingPage />}>
              {" "}
            </Route>

            {/* Cela fonctionne si le chemin ne correspond à aucune option déjà présente */}
            <Route path="*" element={<Home />}>
              {" "}
            </Route>
          </Routes>
      
    </BrowserRouter>
  );
};

export default App;
