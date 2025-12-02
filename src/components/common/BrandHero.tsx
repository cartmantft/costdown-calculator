import { useState } from 'react';
import { BRAND_COLOR, BRAND_LOGO_SRC, BRAND_NAME, BRAND_TAGLINE } from './brand';

const BrandHero = () => {
  const [logoError, setLogoError] = useState(false);
  const showLogo = !logoError;

  return (
    <div className="brand-hero">
      <div className="brand-hero-icon" style={{ backgroundColor: `${BRAND_COLOR}1a` }}>
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
      <div className="brand-hero-text">
        <div className="brand-hero-title">{BRAND_NAME}</div>
        <div className="brand-hero-sub">물타기 계산기로 이동했어요</div>
        <div className="brand-hero-tagline">{BRAND_TAGLINE}</div>
      </div>
    </div>
  );
};

export default BrandHero;
