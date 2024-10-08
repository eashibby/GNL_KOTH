import * as React from 'react';
import TerrainIcon from '@mui/icons-material/Terrain';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';

export const navbarItems = [
    {
        id:0,
        icon: <HomeIcon />,
        label: 'Home',
        route: ''
    },
    {
        id:1,
        icon: <TerrainIcon />,
        label: 'King of the Hill',
        route: 'koth'
    },
    {
        id:2,
        icon: <HistoryIcon />,
        label: 'Koth History',
        route: 'koth_history'
    }
]