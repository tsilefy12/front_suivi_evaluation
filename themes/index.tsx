import { createTheme } from '@mui/material/styles';
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import componentsOverride from "./overrides";
import typography from "./typography";

export const themes = (customization: any) => {

    const themeOptions = {
        palette,
        shape: { ...customization },
        shadows,
        customShadows,
        typography,
    } as any

    const themes = createTheme(themeOptions);
    themes.components = componentsOverride(themes);

    return themes;
};

export default themes;

/**
 * Add custom color in material ui
 * 
 */
declare module "@mui/material/styles" {
    interface PaletteColor {
      lightest?: string;
      lighter?: string;
      darker?: string;
    }
  
    interface PaletteOptions {
      accent: any;
      greymenu: any;
    }
  }
  
  declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
      accent: any;
      greymenu: any;
    }
  }
  
  declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
      accent: any;
      greymenu: any;
    }
  }
