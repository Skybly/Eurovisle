import React from "react";
import Home from "./pages/Home";
import Romance from "./pages/Romance";
import Horror from "./pages/Horror";
import Animation from "./pages/Animation";
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
                    <Route path="/animation" element={<Animation />} />
                </Routes>
            </Router>
        </GameProvider>
    );
}

export default App;
