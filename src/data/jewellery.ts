import type { Dataset } from './types'
import { jewelleryScreens } from './jewellery-screens'

/**
 * Jewellery Suite — the real app.
 *
 * Colours are taken from lib/ui/palette.dart so the mock reads as your APK
 * rather than as generic Material:
 *
 *   kBg #EFECE4 · kGold #C9A227 · kGoldDark #9A7B10 · kInk #2B2B2B
 *   kGreen #2E7D32 · kRed #C62828 · kBlue #1565C0
 *
 * The gradient cards (#3A2E0E → #6B5417) and the label gold (#E7D48B) are
 * hard-coded in the Dart source rather than living in the palette, which is why
 * they appear as literal values in the mock stylesheet too.
 */
export const jewellery: Dataset = {
  key: 'jewellery',
  title: 'Jewellery Suite',
  subtitle:
    'Your running app, screen by screen. Use this to review structure, see where a control is missing or inconsistent, and check which Material pattern each screen is built from.',
  screenName: 'Jewellery Suite',
  theme: {
    bg: '#EFECE4',
    surface: '#FFFFFF',
    ink: '#2B2B2B',
    accent: '#C9A227',
    accentDark: '#9A7B10',
  },
  screens: jewelleryScreens,
}
