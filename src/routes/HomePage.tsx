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
        <header className="list-header list-header-right">
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
      <header className="list-header list-header-right">
        <button type="button" className="btn ghost" onClick={() => setView('list')}>
          목록으로
        </button>
      </header>
      <section className="card">
        <DcaForm
          input={input}
          onChange={updateInput}
          onChangeLot={updateLot}
          onAddLot={addLot}
          onRemoveLot={removeLot}
          onSave={saveAndBack}
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
