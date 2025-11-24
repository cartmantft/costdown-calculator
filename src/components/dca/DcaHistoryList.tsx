import React, { useRef, useState } from 'react';
import { appConfig } from '../../config/appConfig';
import type { DcaHistoryItem } from '../../features/dca/types';

interface DcaHistoryListProps {
  history: DcaHistoryItem[];
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const formatNumber = (value: number) =>
  Number.isFinite(value) ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';

const formatPercent = (value: number) =>
  Number.isFinite(value) ? `${value > 0 ? '+' : ''}${(value * 100).toFixed(2)}%` : '-';

const DcaHistoryList = ({ history, onSelect, onDelete }: DcaHistoryListProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const startXRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  const tapBlockedRef = useRef(false);
  const currencySymbol = appConfig.currencySymbol;

  const extractX = (event: React.PointerEvent | React.TouchEvent) => {
    if ('clientX' in event) return event.clientX;
    if ('touches' in event && event.touches[0]) return event.touches[0].clientX;
    return null;
  };

  const handlePointerStart = (id: string, event: React.PointerEvent | React.TouchEvent) => {
    const x = extractX(event);
    if (x === null) return;
    startXRef.current = x;
    movedRef.current = false;
    tapBlockedRef.current = false;
  };

  const handlePointerMove = (id: string, event: React.PointerEvent | React.TouchEvent) => {
    if (startXRef.current === null) return;
    const x = extractX(event);
    if (x === null) return;
    const delta = x - startXRef.current;
    if (Math.abs(delta) > 6) {
      tapBlockedRef.current = true;
    }
    if (delta < -30) {
      setOpenId(id);
      movedRef.current = true;
    } else if (delta > 30) {
      setOpenId(null);
      movedRef.current = true;
    }
  };

  const handlePointerEnd = (id: string, target?: HTMLElement | null) => {
    if (!movedRef.current && target?.closest('.history-delete')) {
      startXRef.current = null;
      movedRef.current = false;
      tapBlockedRef.current = false;
      return;
    }

    if (!movedRef.current && !tapBlockedRef.current && openId !== id) {
      onSelect?.(id);
    }
    startXRef.current = null;
    movedRef.current = false;
    tapBlockedRef.current = false;
  };

  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete?.(id);
    setOpenId(null);
  };

  if (!history.length) {
    return <p className="muted">계산 기록이 없습니다.</p>;
  }

  return (
    <ul className="history-list">
      {history.map((item) => {
        const isGain = item.result.additionalReturn > 0;
        const badgeClass = isGain ? 'badge-positive' : 'badge-negative';
        const isOpen = openId === item.id;
        return (
          <li key={item.id} className={`history-item ${isOpen ? 'open' : ''}`}>
            <div
              className="history-item-swipe"
              role="button"
              tabIndex={0}
              onPointerDown={(e) => handlePointerStart(item.id, e)}
              onPointerMove={(e) => handlePointerMove(item.id, e)}
              onPointerUp={(e) => handlePointerEnd(item.id, e.target as HTMLElement | null)}
              onPointerCancel={() => {
                setOpenId(null);
                tapBlockedRef.current = false;
              }}
              onTouchStart={(e) => handlePointerStart(item.id, e)}
              onTouchMove={(e) => handlePointerMove(item.id, e)}
              onTouchEnd={(e) => handlePointerEnd(item.id, e.target as HTMLElement | null)}
            >
              <div className="history-card history-content">
                <div className="history-meta">
                  <div className="history-title">{item.input.symbol || '이름 없는 종목'}</div>
                  <div className="history-value">
                    <div className="history-price">
                      {formatNumber(item.result.finalAvgPrice)} {currencySymbol}
                    </div>
                    <span className={`pill ${badgeClass}`}>{formatPercent(item.result.additionalReturn)}</span>
                  </div>
                </div>
                <div className="history-stats">
                  <span>총 수량 {formatNumber(item.result.finalQuantity)}주</span>
                  <span>
                    추가 매수 {formatNumber(item.result.additionalTotalCost)} {currencySymbol}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="history-delete"
                onPointerDown={(event) => {
                  event.stopPropagation();
                  startXRef.current = null;
                  movedRef.current = true;
                }}
                onTouchStart={(event) => {
                  event.stopPropagation();
                  startXRef.current = null;
                  movedRef.current = true;
                }}
                onPointerUp={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onTouchEnd={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onClick={(event) => handleDelete(item.id, event)}
              >
                삭제
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DcaHistoryList;
