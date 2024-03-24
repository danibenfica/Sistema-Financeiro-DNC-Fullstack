'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#f48fb1',
    },
    background: {
      default: '#fce4ec',
    }
  },
  typography: {
    h1: {
      fontFamily: ['Arial', 'san-serif'].join(','),
      fontSize: '40px',
      fontWeight: '500',
      lineHeight: '32px',
      letterSpacing: '0.08em',
    },
    h2: {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '28px',
      letterSpacing: '0em',
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={ theme }>
      <html lang="en">
        <body className={ inter.className }>{ children }</body>
      </html>
    </ThemeProvider>
  );
}
