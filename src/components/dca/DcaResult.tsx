import type { DcaResult as DcaResultData } from '../../features/dca/types';

interface DcaResultProps {
  result: DcaResultData | null;
}

const formatNumber = (value: number) =>
  Number.isFinite(value) ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';

const DcaResult = ({ result }: DcaResultProps) => {
  if (!result) {
    return <p className="muted">입력값을 채운 뒤 계산하기를 눌러주세요. (타겟 평균단가는 시장가보다 커야 합니다)</p>;
  }

  return (
    <div className="result">
      <div className="result-row">
        <span>추가 매수 수량</span>
        <strong>{formatNumber(result.additionalQuantity)} 개</strong>
      </div>
      <div className="result-row">
        <span>추가 매수 비용</span>
        <strong>{formatNumber(result.additionalCost)} 원</strong>
      </div>
      <div className="result-row">
        <span>예상 평균단가</span>
        <strong>{formatNumber(result.resultingAvgPrice)} 원</strong>
      </div>
    </div>
  );
};

export default DcaResult;
