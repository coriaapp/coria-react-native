import { Appearance } from "react-native"

const colorScheme = Appearance.getColorScheme();

//dark or light mode
export const isLightTheme = colorScheme === 'light' ? true : false