import HomePage from './routes/HomePage';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>물타기 계산기</h1>
        <p>목표 평균단가에 맞춰 추가 매수 수량과 비용을 계산</p>
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
