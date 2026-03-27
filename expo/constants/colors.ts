export default {
  brand: {
    green: '#00DC64',
    greenDark: '#00B854',
  },
  background: {
    main: '#FFFFFF',
    surface: '#F5F5F5',
    dark: '#1A1A1A',
    overlay: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    primary: '#000000',
    secondary: '#999999',
    white: '#FFFFFF',
    muted: '#CCCCCC',
  },
  border: {
    light: '#E5E5E5',
    medium: '#DDDDDD',
  },
  status: {
    ongoing: '#00DC64',
    completed: '#3B82F6',
    hiatus: '#F59E0B',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const typography = {
  h1Hero: {
    fontSize: 22,
    fontWeight: '700' as const,
  },
  h2Section: {
    fontSize: 18,
    fontWeight: '800' as const,
  },
  h3Title: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  bodyRegular: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  captionMeta: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
  captionSmall: {
    fontSize: 10,
    fontWeight: '500' as const,
  },
};

export const cardRadius = 4;
