import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Divider, List, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieListCard } from './MovieListCard.jsx';

export const MovieList = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      const url = 'http://localhost:3000/movies';
      try {
        let movies = await fetch(url).then(response => response.json());
        setMovies(movies);
      } catch (err) {
        alert('Ошибка в запросе имени автора: ' + err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    setLoading(true);
  }, []);

  if (loading) return <CircularProgress />;

  const filteredMovie = movies.filter(movie => {
    return movie.title.toLowerCase()?.includes(searchQuery ? searchQuery?.toLowerCase() : []);
  });
  return (
    <>
      <Paper
        sx={{
          maxHeight: 600,
          overflow: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <List>
          {filteredMovie?.map(movie => {
            return <MovieListCard key={movie.id} movie={movie} />;
          })}
        </List>
      </Paper>
      <Divider sx={{ mb: 5, mr: 2 }}></Divider>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Найдено {filteredMovie.length} элементов
        </Typography>
        <Link to={'/movie/create'} style={{ color: '#000', display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" component="span" color="button" sx={{ mr: 3 }}>
            <AddIcon />
            <Typography variant="h7" component="span" sx={{ ml: 1 }}>
              Добавить
            </Typography>
          </Button>
        </Link>
      </Box>
    </>
  );
};

MovieList.propTypes = {
  searchQuery: PropTypes.string,
};
