import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CelebrityProvider } from './context/CelebrityContext';
import Header from './components/Header';
import CelebrityList from './pages/CelebrityList';
import CelebrityDetail from './pages/CelebrityDetail';
import AddCelebrity from './pages/AddCelebrity';

export default function App() {
  return (
    <BrowserRouter>
      <CelebrityProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<CelebrityList />} />
            <Route path="/celebrity/:id" element={<CelebrityDetail />} />
            <Route path="/add" element={<AddCelebrity />} />
          </Routes>
        </div>
      </CelebrityProvider>
    </BrowserRouter>
  );
}
