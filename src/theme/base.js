import { LightTheme } from './schemes/LightTheme';

const themeMap = {
  LightTheme,
};

export function themeCreator(theme) {
  return themeMap[theme];
}
