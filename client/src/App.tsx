import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Home, Dashboard } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
