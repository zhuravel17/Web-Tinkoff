import { Box, Button, CircularProgress, Divider, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export const EditForm = () => {
  const { id: movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  const refreshAfterAction = () => {
    navigate(`/movie/${movieId}`);
    window.location.reload();
  };

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async id => {
      const url = `http://localhost:3000/movies/${id}`;
      try {
        const response = await fetch(url);
        const currentMovie = await response.json();
        setMovie(currentMovie);
      } catch (err) {
        alert('Ошибка в запросе фильма для редактирования: ' + err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies(movieId);
  }, [movieId]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      }).then(() => {});
    } catch (err) {
      alert(err);
    }

    refreshAfterAction();
  };
  const collectedArray = e => {
    setMovie(prevState => {
      return { ...prevState, [e.target.name]: e.target.value.split(', ') };
    });
  };

  if (loading) return <CircularProgress />;
  const onChange = e => {
    setMovie(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h2>Редактирование фильма</h2>
      <TextField
        label="Название фильма"
        onChange={onChange}
        required
        variant="standard"
        type="text"
        sx={{ mb: 3, padding: '1px', border: 'none' }}
        fullWidth
        name={'title'}
        value={movie.title}
      />
      <TextField
        label="Жанры"
        onChange={collectedArray}
        required
        variant="standard"
        type="text"
        sx={{ mb: 3 }}
        fullWidth
        name={'genres'}
        value={movie.genres}
      />
      <TextField
        label="Длительность фильма (мин)"
        onChange={onChange}
        required
        variant="standard"
        type="number"
        sx={{ mb: 3 }}
        fullWidth
        name={'runtime'}
        value={movie.runtime}
      />
      <TextField
        label="Год выхода"
        onChange={onChange}
        required
        variant="standard"
        type="number"
        sx={{ mb: 3 }}
        fullWidth
        name={'year'}
        value={movie.year}
      />
      <TextField
        label="Описание фильма"
        onChange={onChange}
        required
        variant="standard"
        type="text"
        sx={{ mb: 3 }}
        fullWidth
        name={'plot'}
        value={movie.plot}
      />
      <TextField
        label="Ссылка на постер фильма"
        onChange={onChange}
        required
        variant="standard"
        type="url"
        sx={{ mb: 3 }}
        fullWidth
        name={'posterUrl'}
        value={movie.posterUrl}
      />
      <TextField
        label="Рейтинг"
        onChange={onChange}
        required
        variant="standard"
        type="number"
        sx={{ mb: 3 }}
        name={'rating'}
        fullWidth
        value={movie.rating}
      />
      <TextField
        label="Список актеров"
        onChange={onChange}
        required
        variant="standard"
        type="text"
        sx={{ mb: 3 }}
        fullWidth
        name={'actors'}
        value={movie.actors}
      />
      <TextField
        label="Режиссер"
        onChange={onChange}
        required
        variant="standard"
        type="text"
        sx={{ mb: 3 }}
        fullWidth
        name={'director'}
        value={movie.director}
      />
      <Divider sx={{ mb: 5 }}></Divider>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to={`/movie/${movieId}`}>
          <Button variant="outlined" sx={{ color: '#dda0dd', background: '#445566' }}>
            Отменить
          </Button>
        </Link>
        <Button color="button" variant="contained" type="submit">
          Сохранить
        </Button>
      </Box>
    </form>
  );
};
