import HomePage from "./pages/homePage";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<h1>Busca en otro lado viejo</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;