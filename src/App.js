import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PieGraph from './pages/PieGraph';
import LineGraph from './pages/LineGraph';
import BarGraph from './pages/BarGraph';
import Table from './pages/Table';
import Main from './pages/Main';
import Login from './pages/Login';

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item" element={<PieGraph />} />
          <Route path="/line" element={<LineGraph />} />
          <Route path="/bar" element={<BarGraph />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
