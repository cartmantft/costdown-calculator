import React, { useState } from 'react';
import { Badge, ConfirmDialog, TextButton } from '@toss/tds-mobile';
import { currencyMap } from '../../config/appConfig';
import { formatCurrencyNumber, formatPercent } from '../../lib/numberFormat';
import type { DcaHistoryItem } from '../../features/dca/types';

interface DcaHistoryListProps {
  history: DcaHistoryItem[];
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DcaHistoryList = ({ history, onSelect, onDelete }: DcaHistoryListProps) => {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setPendingDeleteId(id);
  };

  const closeConfirm = () => setPendingDeleteId(null);

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    onDelete?.(pendingDeleteId);
    setPendingDeleteId(null);
  };

  if (!history.length) {
    return <p className="muted">계산 기록이 없습니다.</p>;
  }

  const pendingDeleteItem = pendingDeleteId
    ? history.find((item) => item.id === pendingDeleteId)
    : null;

  return (
    <>
      <ul className="history-list">
        {history.map((item) => {
          const isGain = item.result.additionalReturn > 0;
          const badgeColor = isGain ? 'red' : 'blue';
          const currencySymbol = currencyMap[item.currency]?.symbol ?? item.currency;
          return (
            <li key={item.id} className="history-item">
              <div
                className="history-card"
                role="button"
                tabIndex={0}
                onClick={() => onSelect?.(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect?.(item.id);
                  }
                }}
              >
                <div className="history-row">
                  <div className="history-title">
                    <Badge size="small" variant="line" color="gray">
                      {item.currency}
                    </Badge>
                    {item.input.symbol || '이름 없는 종목'}
                  </div>
                  <TextButton
                    size="small"
                    variant="arrow"
                    arrowPlacement="inline"
                    className="text-danger"
                    color="danger"
                    onClick={(event) => handleDeleteClick(item.id, event)}
                  >
                    삭제
                  </TextButton>
                </div>
                <div className="history-row price-row">
                  <div className="history-price">
                    {formatCurrencyNumber(item.result.finalAvgPrice, item.currency)} {currencySymbol}
                  </div>
                  <Badge size="small" variant="fill" color={badgeColor}>
                    {formatPercent(item.result.additionalReturn)}
                  </Badge>
                </div>
                <div className="history-stats">
                  <span>총 수량 {formatCurrencyNumber(item.result.finalQuantity, item.currency)}주</span>
                  <span>
                    총 금액 {formatCurrencyNumber(item.result.additionalTotalCost, item.currency)}{' '}
                    {currencySymbol}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <ConfirmDialog
        open={pendingDeleteId !== null}
        onClose={closeConfirm}
        title="삭제할까요?"
        description={
          pendingDeleteItem
            ? `${pendingDeleteItem.input.symbol || '이름 없는 종목'} 계산 기록을 삭제합니다.`
            : '저장된 계산 기록을 삭제합니다.'
        }
        cancelButton={
          <ConfirmDialog.CancelButton variant="weak" onClick={closeConfirm}>
            취소
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton color="danger" onClick={confirmDelete}>
            삭제
          </ConfirmDialog.ConfirmButton>
        }
      />
    </>
  );
};

export default DcaHistoryList;
