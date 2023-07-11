import React from 'react';
import './App.css';
import Routers from './routers/Routers';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#C7F860',
            darker: '#053e85',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '--TextField-brandBackground': '#ff0000',
                    '& label.Mui-focused': {
                        color: '#727580',
                    },
                    '& MuiOutlinedInput-notchedOutline': {
                        border: '0',
                    },
                },
            },
        },
    },
});

function App() {
    return (
        <div className="wrapper">
            <ThemeProvider theme={theme}>
                <Routers />
            </ThemeProvider>
        </div>
    );
}

export default App;
