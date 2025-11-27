import { Badge } from '@toss/tds-mobile';
import { currencyMap } from '../../config/appConfig';
import { formatCurrencyNumber, formatPercent } from '../../lib/numberFormat';
import type { CurrencyCode, DcaResult as DcaResultData } from '../../features/dca/types';

interface DcaResultProps {
  result: DcaResultData | null;
  currency: CurrencyCode;
}

const DcaResult = ({ result, currency }: DcaResultProps) => {
  if (!result) {
    return <p className="muted">필수 입력을 채우면 결과가 바로 계산됩니다.</p>;
  }

  const isGain = result.additionalReturn > 0;
  const badgeColor = isGain ? 'red' : 'blue';
  const currencySymbol = currencyMap[currency]?.symbol ?? currency;

  return (
    <div className="result">
      <div className="result-row">
        <span>최종 평균단가</span>
        <strong>
          {formatCurrencyNumber(result.finalAvgPrice, currency)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>최종 보유 수량</span>
        <strong>{formatCurrencyNumber(result.finalQuantity, currency)} 주</strong>
      </div>
      <div className="result-row">
        <span>현재 보유 총액</span>
        <strong>
          {formatCurrencyNumber(result.currentTotalCost, currency)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>추가 매수 총액</span>
        <strong>
          {formatCurrencyNumber(result.additionalTotalCost, currency)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>추가 매수 평균단가</span>
        <strong>
          {formatCurrencyNumber(result.additionalAvgPrice, currency)} {currencySymbol}
        </strong>
      </div>
      <div className="result-row">
        <span>추가 매수 후 손익률</span>
        <Badge size="small" variant="fill" color={badgeColor}>
          {formatPercent(result.additionalReturn)}
        </Badge>
      </div>
    </div>
  );
};

export default DcaResult;
