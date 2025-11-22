import DcaForm from '../components/dca/DcaForm';
import DcaHistoryList from '../components/dca/DcaHistoryList';
import DcaResult from '../components/dca/DcaResult';
import { useDcaCalculator } from '../features/dca/hooks';

const HomePage = () => {
  const { input, result, history, updateInput, calculate, reset } = useDcaCalculator();

  return (
    <div className="page-grid">
      <section className="card">
        <div className="card-header">
          <h2>입력</h2>
          <p>현재 평균단가, 보유수량, 시장가, 목표 평균단가를 입력하세요.</p>
        </div>
        <DcaForm input={input} onChange={updateInput} onSubmit={calculate} onReset={reset} />
      </section>

      <section className="card">
        <div className="card-header">
          <h2>계산 결과</h2>
          <p>추가 매수 필요한 수량과 비용을 확인하세요.</p>
        </div>
        <DcaResult result={result} />
      </section>

      <section className="card">
        <div className="card-header">
          <h2>최근 계산</h2>
          <p>로컬에 저장된 최근 계산 기록입니다.</p>
        </div>
        <DcaHistoryList history={history} />
      </section>
    </div>
  );
};

export default HomePage;
