import React, { useEffect } from 'react';
import './App.css';
import Routers from './routers/Routers';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { hotjar } from 'react-hotjar';

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
    // 아래 useEffect 추가
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            hotjar.initialize(3573560, 6);
        }
    }, []);

    return (
        <div className="wrapper">
            <ThemeProvider theme={theme}>
                <Routers />
            </ThemeProvider>
        </div>
    );
}

export default App;
