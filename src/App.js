import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GoogleChart from './pages/Googlechart';
import LineGraph from './pages/LineGraph';
import BarGraph from './pages/BarGraph';
import Table from './pages/Table';

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<GoogleChart />} />
          <Route path="/item" element={<GoogleChart />} />
          <Route path="/line" element={<LineGraph />} />
          <Route path="/bar" element={<BarGraph />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
