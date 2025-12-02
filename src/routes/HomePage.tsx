import { useState } from 'react';
import { BottomCTA, Button, ListHeader, Toast } from '@toss/tds-mobile';
import DcaForm from '../components/dca/DcaForm';
import DcaHistoryList from '../components/dca/DcaHistoryList';
import DcaResult from '../components/dca/DcaResult';
import BrandBar from '../components/common/BrandBar';
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
    selectedId,
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

  const handleAddLot = () => {
    if (input.additionalLots.length >= 5) {
      showToast('추가 매수는 최대 5개까지 입력할 수 있어요.');
      return;
    }
    addLot();
  };

  const saveAndBack = () => {
    if (!selectedId && history.length >= 10) {
      showToast('계산은 최대 10개까지 저장할 수 있어요.');
      return;
    }
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
        <BrandBar variant="bridge" />
        <div className="single-column">
          <ListHeader
            title={
              <ListHeader.TitleParagraph fontWeight="bold" typography="t4">
                계산 목록
              </ListHeader.TitleParagraph>
            }
            description={
              <ListHeader.DescriptionParagraph>
                저장된 계산을 탭해 수정하거나 새 계산을 시작하세요.
              </ListHeader.DescriptionParagraph>
            }
            descriptionPosition="bottom"
          />
          <div className="list-cta">
            <Button color="primary" size="small" onClick={() => openDetail()}>
              새 계산
            </Button>
          </div>
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
      <BrandBar variant="bridge" />
      <div className="page-grid has-bottom-cta">
        <section className="card">
          <DcaForm
            input={input}
            onChange={updateInput}
            onChangeLot={updateLot}
            onAddLot={handleAddLot}
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
          <DcaResult result={result} currency={input.currency} />
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
