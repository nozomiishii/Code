import styled, { createGlobalStyle, css } from 'styled-components';

export enum Color {
  BG_COLOR = '#EEF0F4',
  DARK_FONT = '#383539',
  GREEN = '#A9DC76',
  TRANSPARENT_LITE_GRAY = 'rgba(56, 53, 57, 0.7)',
  ERROR = '#ec524b',
}

export const Neumorphism = {
  BASE: Color.BG_COLOR,
  LIGHT: '#FCFEFF',
  SHADOW: '#E0E2E5',
};
interface P {
  inset?: boolean;
  borderColor?: string;
}

const boxShadow = ({ inset = false }) => {
  return inset
    ? css`
        box-shadow: inset 4px 4px 5px ${Neumorphism.SHADOW},
          inset -6px -6px 14px ${Neumorphism.LIGHT};
      `
    : css`
        box-shadow: 4px 4px 5px ${Neumorphism.SHADOW},
          -6px -6px 14px ${Neumorphism.LIGHT};
      `;
};

const highBoxShadow = ({ inset = false }) => {
  return inset
    ? css`
        box-shadow: inset 8px 8px 10px ${Neumorphism.SHADOW},
          inset -12px -12px 28px ${Neumorphism.LIGHT};
      `
    : css`
        box-shadow: 8px 8px 10px ${Neumorphism.SHADOW},
          -12px -12px 28px ${Neumorphism.LIGHT};
      `;
};

const border = ({ borderColor = Neumorphism.SHADOW }) => {
  return css`
    border: 1px solid ${borderColor};
  `;
};

export const NeuDiv = styled.div<P>`
  background: ${Neumorphism.BASE};
  border-radius: 15px;
  ${border}
  ${boxShadow}
`;

export const NeuButton = styled.button<P>`
  background: ${Neumorphism.BASE};
  border-radius: 15px;
  padding: 8px;
  ${border}
  border-width:2px;
  ${boxShadow}
  &:focus {
    border: none;
    outline: none;
  }
  &:active {
    border: none;
    outline: none;
    box-shadow: inset 8px 8px 10px ${Neumorphism.SHADOW},
      inset -12px -12px 28px ${Neumorphism.LIGHT};
  }
`;

export const NeuInput = styled.input<P>`
  background: ${Neumorphism.BASE};
  border-radius: 4px;
  padding: 8px;
  border-width: 2px;
  border: 1px solid ${Neumorphism.SHADOW};
  ${boxShadow}
  &:focus {
    border: 2px solid ${Color.GREEN};
    outline: none;
  }
`;

export const NeuTextarea = styled.textarea<P>`
  background: ${Neumorphism.BASE};
  border-radius: 4px;
  padding: 8px;
  border-width: 2px;
  border: 1px solid ${Neumorphism.SHADOW};
  ${boxShadow}
  &:focus {
    border: 2px solid ${Color.GREEN};
    outline: none;
  }
`;

export const GlobalStyle = createGlobalStyle`
  *{
		margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
	body{
		min-height: 100vh;
    font-family: 'Kosugi Maru', sans-serif;
    background-color:${Color.BG_COLOR};
    color: ${Color.DARK_FONT};
	}
`;
