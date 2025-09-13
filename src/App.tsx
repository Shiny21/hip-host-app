import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RemoteLoader from './remote/RemoteLoader';
import Home from './components/Home';
import { getRemotes } from './types/remotes';

const ToastContainer = React.lazy(() => import('authApp/Toast'));

const App: React.FC = () => {
  const [remotes, setRemotes] = React.useState<any[]>([]);

  React.useEffect(() => {
    // use dynamic remotes from env
    setRemotes(getRemotes());
  }, []);

  return (
    <BrowserRouter>
      <header style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        {remotes.map(r => <Link key={r.name} to={r.route} style={{ marginRight: 12 }}>{r.name}</Link>)}
      </header>

      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {remotes.map((r) => (
            <Route
              key={r.name}
              path={r.route + '/*'}
              element={
                <React.Suspense fallback={<div>Loading {r.name}...</div>}>
                  <RemoteLoader remote={r} fallback={<div>{r.name} is unavailable.</div>} />
                </React.Suspense>
              }
            />
          ))}
        </Routes>
      </main>

      <React.Suspense fallback={null}>
        <ToastContainer />
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
