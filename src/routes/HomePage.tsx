import { useState } from 'react';
import { BottomCTA, Button, ListHeader, Toast, Top } from '@toss/tds-mobile';
import DcaForm from '../components/dca/DcaForm';
import DcaHistoryList from '../components/dca/DcaHistoryList';
import DcaResult from '../components/dca/DcaResult';
import { useDcaCalculator } from '../features/dca/hooks';

type View = 'list' | 'detail';

const HomePage = () => {
  const [view, setView] = useState<View>('list');
  const [toast, setToast] = useState<{ open: boolean; text: string }>({
    open: false,
    text: '',
  });
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

  const showToast = (text: string) => {
    setToast({ open: true, text });
  };

  const openDetail = (id?: string) => {
    if (id) {
      openFromHistory(id);
    } else {
      reset();
    }
    setView('detail');
  };

  const saveAndBack = () => {
    const next = save();
    if (next?.ok) {
      showToast('저장했습니다');
      setView('list');
    }
  };

  const deleteAndNotify = (id: string) => {
    deleteEntry(id);
    showToast('삭제했습니다');
  };

  if (view === 'list') {
    return (
      <>
        <div className="single-column">
          <Top
            title={<Top.TitleParagraph>물타기 계산기</Top.TitleParagraph>}
            subtitle={
              <Top.SubtitleParagraph>
                저장된 계산을 탭해 수정하거나 새 계산을 시작하세요.
              </Top.SubtitleParagraph>
            }
            right={<Top.RightButton onClick={() => openDetail()}>새 계산</Top.RightButton>}
          />
          <DcaHistoryList
            history={history}
            onSelect={(id) => openDetail(id)}
            onDelete={(id) => deleteAndNotify(id)}
          />
        </div>
        <Toast
          position="bottom"
          open={toast.open}
          text={toast.text}
          higherThanCTA={false}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        />
      </>
    );
  }

  return (
    <>
      <div className="page-grid has-bottom-cta">
        <Top
          title={<Top.TitleParagraph>물타기 계산</Top.TitleParagraph>}
          subtitle={
            <Top.SubtitleParagraph>
              입력값을 채우면 결과가 바로 계산되고 저장됩니다.
            </Top.SubtitleParagraph>
          }
        />
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
        <BottomCTA.Double
          fixed
          leftButton={
            <Button variant="weak" size="large" onClick={() => setView('list')}>
              목록으로
            </Button>
          }
          rightButton={
            <Button color="primary" size="large" disabled={!result} onClick={saveAndBack}>
              저장
            </Button>
          }
        />
      </div>
      <Toast
        position="bottom"
        higherThanCTA
        open={toast.open}
        text={toast.text}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default HomePage;
