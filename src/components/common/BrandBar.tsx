import { useState } from 'react';

const BRAND_NAME = 'Costdown Calculator';
const BRAND_TAGLINE = '코스트다운 · DCA 계산 도우미';
const BRAND_LOGO_SRC = '/logo.png';
const BRAND_COLOR = '#1b64f2';

interface BrandBarProps {
  variant?: 'bridge' | 'nav';
}

const BrandBar = ({ variant = 'bridge' }: BrandBarProps) => {
  const [logoError, setLogoError] = useState(false);
  const showLogo = !logoError;

  return (
    <div className={`brand-bar brand-bar-${variant}`}>
      <div className="brand-icon" style={{ backgroundColor: BRAND_COLOR }}>
        {showLogo ? (
          <img
            src={BRAND_LOGO_SRC}
            alt={`${BRAND_NAME} 아이콘`}
            onError={() => setLogoError(true)}
            loading="lazy"
          />
        ) : (
          <span aria-hidden="true">{BRAND_NAME.charAt(0)}</span>
        )}
      </div>
      <div className="brand-meta">
        <div className="brand-name">{BRAND_NAME}</div>
        {variant === 'bridge' && <div className="brand-tagline">{BRAND_TAGLINE}</div>}
      </div>
    </div>
  );
};

export default BrandBar;
