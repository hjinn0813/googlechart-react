import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PieGraph from './pages/PieGraph';
import LineGraph from './pages/LineGraph';
import BarGraph from './pages/BarGraph';
import Table from './pages/Table';
import Main from './pages/Main';
import Login from './pages/Login';
import Players from './pages/volleyball/Players';
import PlayerDetail from './pages/volleyball/PlayerDetail';
import Altos from './pages/volleyball/Altos';
import AltosDetail from './pages/volleyball/AltosDetail';

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/altos" element={<Altos />} />
          <Route path="/altos/:id" element={<AltosDetail />} />
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
