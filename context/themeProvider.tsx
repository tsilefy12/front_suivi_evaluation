import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { useAppSelector } from '../hooks/reduxHooks';
import themes from '../themes';

export default function ThemeProvider({ children }: any) {
    const customization = useAppSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={themes(customization)}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
