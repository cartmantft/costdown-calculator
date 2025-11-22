import type { DcaHistoryItem } from '../../features/dca/types';

interface DcaHistoryListProps {
  history: DcaHistoryItem[];
}

const formatNumber = (value: number) =>
  Number.isFinite(value) ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';

const DcaHistoryList = ({ history }: DcaHistoryListProps) => {
  if (!history.length) {
    return <p className="muted">계산 기록이 없습니다.</p>;
  }

  return (
    <ul className="history-list">
      {history.map((item) => (
        <li key={item.id} className="history-item">
          <div className="history-meta">
            <span className="muted">
              {new Date(item.createdAt).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <strong>{formatNumber(item.result.resultingAvgPrice)} 원</strong>
          </div>
          <div className="history-stats">
            <span>수량 +{formatNumber(item.result.additionalQuantity)}</span>
            <span>비용 {formatNumber(item.result.additionalCost)} 원</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DcaHistoryList;
