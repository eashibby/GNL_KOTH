import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Navbar from './compontents/NavBar/Navbar';
import { Outlet } from 'react-router-dom';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

function App() {
    return (
        <div>
            <Navbar />
            <DrawerHeader />
            <Outlet />
        </div>
    );
}
 
export default App;