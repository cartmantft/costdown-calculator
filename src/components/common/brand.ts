import logoUrl from '../../assets/logo.png';

export const BRAND_NAME = '물타기 계산기';
export const BRAND_TAGLINE = '코스트다운 · DCA 계산 도우미';
const hostedLogo = import.meta.env.VITE_BRAND_LOGO_URL?.trim();
export const BRAND_LOGO_SRC = hostedLogo || logoUrl; // 호스팅 절대 경로 우선, 없으면 번들 자산 사용
export const BRAND_COLOR = '#1b64f2';

if (import.meta.env.DEV) {
  console.info('[brand] resolved logo', {
    hostedLogo,
    resolved: BRAND_LOGO_SRC,
  });
}
