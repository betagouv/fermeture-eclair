import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AddToken } from './pages';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/add-token" element={<AddToken />} />
                <Route path="/" element={<Navigate to="/add-token" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
export { Router };
