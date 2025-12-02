import BrandBar from './components/common/BrandBar';
import HomePage from './routes/HomePage';

function App() {
  return (
    <div className="app-shell">
      <BrandBar variant="nav" />
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
