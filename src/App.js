import React from "react";
import Home from "./pages/Home";
import Romance from "./pages/Romance";
import Horror from "./pages/Horror";
import Women from "./pages/Women";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
    return (
        <GameProvider>
            <Router>
                <Analytics />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/romance" element={<Romance />} />
                    <Route path="/horror" element={<Horror />} />
                    <Route path="/women" element={<Women />} />
                </Routes>
            </Router>
        </GameProvider>
    );
}

export default App;
