import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CelebrityProvider } from './context/CelebrityContext';
import DanceFloor from './pages/DanceFloor';
import CelebrityList from './pages/CelebrityList';
import CelebrityDetail from './pages/CelebrityDetail';
import AddCelebrity from './pages/AddCelebrity';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <CelebrityProvider>
        <Routes>
          {/* Dance floor is the landing page — no header */}
          <Route path="/" element={<DanceFloor />} />

          {/* List/detail views keep the header */}
          <Route
            path="/list"
            element={
              <div className="min-h-screen">
                <Header />
                <CelebrityList />
              </div>
            }
          />
          <Route
            path="/celebrity/:id"
            element={
              <div className="min-h-screen">
                <Header />
                <CelebrityDetail />
              </div>
            }
          />
          <Route
            path="/add"
            element={
              <div className="min-h-screen">
                <Header />
                <AddCelebrity />
              </div>
            }
          />
        </Routes>
      </CelebrityProvider>
    </BrowserRouter>
  );
}
