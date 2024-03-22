'use client'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation';
import * as S from './style';

const drawerWidth = 240;

export const Menu = ({ children }) => {
  const router = useRouter();

  const doLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          '& .MuiPaper-root': {
            backgroundColor: 'rgb(89, 0, 49);',
            color: '#fff',
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <S.Typography
          variant='h1' 
          color='primary' 
          style={{marginTop: '48px',
          marginBottom: '40px',
          fontSize: '27px'}}
        >
          YOURfinance.IO
        </S.Typography>
        <List>
          <ListItem disablePadding>
            <S.Link href="/dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <S.Typography 
                  variant='h3' 
                  color='primary' 
                  style={{ fontSize: '27px'}}>
                    ░░
                  </S.Typography>
                </ListItemIcon>
                <ListItemText primary="Meu Painel" />
              </ListItemButton>
            </S.Link>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <S.Link href="/categoria">
              <ListItemButton>
                <ListItemIcon>
                  <S.Typography 
                  variant='h3' 
                  color='primary' 
                  style={{ fontSize: '27px'}}>
                    👝
                  </S.Typography>
                </ListItemIcon>
                <ListItemText primary="Categoria" />
              </ListItemButton>
            </S.Link>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <S.Link href="/extrato">
              <ListItemButton>
                <ListItemIcon>
                  <S.Typography 
                  variant='h3' 
                  color='primary' 
                  style={{ fontSize: '27px'}}>
                    ↹
                  </S.Typography>
                </ListItemIcon>
                <ListItemText primary="Extrato" />
              </ListItemButton>
            </S.Link>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={ doLogout }>
              <ListItemIcon>
                <S.Typography 
                variant='h3' 
                color='primary' 
                style={{ fontSize: '27px'}}>
                  ➨
                </S.Typography>
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer> 
      <Box
        component="main"
        sx={{ flexGrow: 1, 
          bgcolor: 'background.default', 
          p: 3 }}
      >
        { children }
      </Box>
    </Box>
  );
}

export default Menu;
