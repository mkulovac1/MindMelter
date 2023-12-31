import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result'
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/quiz" element={<Layout />}>
            <Route index element={<Quiz />} />
          </Route>

          <Route path="/result" element={<Layout />}>
            <Route index element={<Result />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
