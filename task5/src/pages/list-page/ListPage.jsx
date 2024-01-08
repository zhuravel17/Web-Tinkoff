import { CssBaseline, Divider, Grid } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components';
import { MovieList } from '../../components/MovieList.jsx';
import { SearchMovie } from '../../components/SearchMovie.jsx';

export function ListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Header />
      <CssBaseline />
      <Grid
        container
        sx={{
          width: 1200,
          maxWidth: 1200,
          minWidth: 1200,
          mt: 10,
          height: 1000,
        }}
        spacing={2}
        columns={16}
      >
        <Grid item={true} xs={6}>
          <SearchMovie searchQuery={searchQuery} onChangeQuery={setSearchQuery} />
          <MovieList searchQuery={searchQuery} sx={{ height: '100%', minHeight: '100vh', maxHeight: '100vh' }} />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item={true} xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
