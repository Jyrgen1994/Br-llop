// src/components/Fonts.tsx
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Adelio Darmanto';
        src: url('/src/assets/fonts/AdelioDarmanto.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
      }
    `}
  />
);

export default Fonts;
