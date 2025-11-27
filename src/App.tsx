import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './contexts/WalletContextProvider';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TechnologyPage } from './pages/TechnologyPage';

function App() {
  return (
    <WalletContextProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background-page">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WalletContextProvider>
  );
}

export default App;
