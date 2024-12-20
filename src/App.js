import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';

import PieGraph from './pages/PieGraph';
import LineGraph from './pages/LineGraph';
import BarGraph from './pages/BarGraph';
import Table from './pages/Table';

import Players from './pages/volleyball/Players';
import PlayerDetail from './pages/volleyball/PlayerDetail';
import Altos from './pages/volleyball/Altos';
import AltosDetail from './pages/volleyball/AltosDetail';
import Spiders from './pages/volleyball/Spiders';
import SpidersDetail from './pages/volleyball/SpidersDetail';

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

          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/altos" element={<Altos />} />
          <Route path="/altos/:id" element={<AltosDetail />} />
          <Route path="/spiders" element={<Spiders />} />
          <Route path="/spiders/:id" element={<SpidersDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
