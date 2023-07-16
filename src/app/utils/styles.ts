import { Variant } from 'styles';
import { Theme, ThemePaletteVariant } from 'theme';

export function getPaletteByVariant(theme: Theme, variant: Variant): ThemePaletteVariant {
  switch (variant) {
    case 'primary':
      return theme.palette.primary;
    case 'secondary':
      return theme.palette.secondary;
    default:
      return theme.palette.primary;
  }
}
