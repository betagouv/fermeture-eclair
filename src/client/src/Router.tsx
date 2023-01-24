import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/front" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}
export { Router };
