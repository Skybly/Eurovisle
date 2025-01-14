import React from "react";
import Home from "./pages/Home";
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
                </Routes>
            </Router>
        </GameProvider>
    );
}

export default App;
