import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <AppBar position="absolute" sx={{ backgroundColor: 'customColor.base_02' }}>
      <Toolbar sx={{ background: '#E8C8EA' }}>
        <Link to={'/'} style={{ flexGrow: 1, color: '#926EAE', fontWeight: 'bold' }}>
          Админка фильмотеки
        </Link>
        <Button variant="standart" color="button">
          6409 zhuravel17
        </Button>
      </Toolbar>
    </AppBar>
  );
};
