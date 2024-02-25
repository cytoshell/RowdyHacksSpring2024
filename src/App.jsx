import { lazy, Suspense } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import NotFound from './NotFound/NotFound';
import Footer from './component/footer';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

// lazy loading these components, prevents users from downloading everything at once
const Home = lazy(() => import('./scenes/home'))
const Features = lazy(() => import('./scenes/features'))
const Contact = lazy(() => import('./scenes/contact'))
const Settings = lazy(() => import('./scenes/settings'))

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <NavBar Link={Link} />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<Settings />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App
