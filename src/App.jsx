import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import AdminPage from "./pages/admin.jsx";
import LoginPage from "./pages/login.jsx";
import Test from "./components/test.jsx";   

function App() {
    return (
        <div className="w-full h-screen bg-primary text-secondary">
			<Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage/>} />
                 {/* all-* koma awath admin ekt enawa */}
                <Route path="/admin/*" element={< AdminPage />} />
                <Route path="/test" element={<div><Test/></div>} />
            </Routes>
        </div>
    );
}    

export default App;
