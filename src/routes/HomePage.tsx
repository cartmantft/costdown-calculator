import { useState } from 'react';
import DcaForm from '../components/dca/DcaForm';
import DcaHistoryList from '../components/dca/DcaHistoryList';
import DcaResult from '../components/dca/DcaResult';
import { useDcaCalculator } from '../features/dca/hooks';

type View = 'list' | 'detail';

const HomePage = () => {
  const [view, setView] = useState<View>('list');
  const {
    input,
    result,
    history,
    updateInput,
    updateLot,
    addLot,
    removeLot,
    reset,
    openFromHistory,
    save,
    deleteEntry,
  } = useDcaCalculator();

  const openDetail = (id?: string) => {
    if (id) openFromHistory(id);
    setView('detail');
  };

  const saveAndBack = () => {
    const next = save();
    if (next?.ok) {
      setView('list');
    }
  };

  if (view === 'list') {
    return (
      <div className="single-column">
        <header className="list-header">
          <div className="list-header-copy">
            <h2>코스트다운 계산기</h2>
          </div>
          <button type="button" className="btn primary list-header-action" onClick={() => openDetail()}>
            새 계산
          </button>
        </header>
        <DcaHistoryList
          history={history}
          onSelect={(id) => openDetail(id)}
          onDelete={(id) => deleteEntry(id)}
        />
      </div>
    );
  }

  return (
    <div className="page-grid">
      <section className="card">
        <div className="card-header card-header-plain">
          <button type="button" className="btn ghost" onClick={() => setView('list')}>
            목록으로
          </button>
        </div>
        <DcaForm
          input={input}
          onChange={updateInput}
          onChangeLot={updateLot}
          onAddLot={addLot}
          onRemoveLot={removeLot}
          onSave={saveAndBack}
          onReset={reset}
          canSave={Boolean(result)}
        />
      </section>

      <section className="card">
        <div className="card-header">
          <h2>계산 결과</h2>
          <p>추가 매수 분리 손익률을 포함한 요약입니다.</p>
        </div>
        <DcaResult result={result} />
      </section>
    </div>
  );
};

export default HomePage;
