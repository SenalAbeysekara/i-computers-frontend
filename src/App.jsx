import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import AdminPage from "./pages/admin.jsx";
import LoginPage from "./pages/login.jsx";

function App() {
    return (
        <div className="w-full h-screen">
			<Routes>
                <Route path="/" element={<HomePage/>} />
                 {/* all-* koma awath admin ekt enawa */}
                <Route path="/admin/*" element={< AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}    

export default App;
