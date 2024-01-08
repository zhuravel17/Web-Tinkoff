import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AcActorstorsList } from './Actors.jsx';
import { Rating } from './Rating.jsx';

const copyIdInClipboard = id => {
  void navigator.clipboard.writeText(id);
};

export const MovieCard = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [isLiked, setLiked] = useState(false);

  let { id: movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async id => {
      const url = `http://localhost:3000/movies/${id}`;
      try {
        const response = await fetch(url);
        const currentMovie = await response.json();
        setMovie(currentMovie);
      } catch (err) {
        alert('Ошибка в запросе на получение данных для отрисовки карточки: ' + err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies(movieId);
  }, [movieId]);

  const imgNotFound = event => {
    event.target.src = 'https://via.placeholder.com/168x250';
  };

  if (loading) return <CircularProgress />;
  const { actors, director, genres, id, plot, posterUrl, runtime, title, year, rating } = movie;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography component="span" sx={{ fontSize: '14px', mr: 2 }}>
            Id: {id}
          </Typography>
          <IconButton component="span" sx={{ width: '14px', height: '14px' }} onClick={copyIdInClipboard(id)}>
            <ContentCopyIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to={`/movie/${id}/edit`}>
            <EditNoteIcon sx={{ color: '#000000' }} />
            <Typography component="span" variant="h6" sx={{ color: '#000000', fontSize: '16px' }}>
              Редактировать
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Box
            component="img"
            sx={{
              height: 300,
              width: 200,
              maxHeight: { xs: 120, md: 300 },
              maxWidth: { xs: 80, md: 200 },
              objectFit: 'cover',
            }}
            alt="Movie poster"
            src={posterUrl}
            onError={imgNotFound}
          />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
              {title}
            </Typography>
            <IconButton onClick={() => setLiked(prevState => !prevState)}>
              <FavoriteIcon aria-label="add to favorites" color={isLiked ? 'primary' : 'inherit'} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" component="span" sx={{ display: 'block', fontWeight: 'bold' }}>
            Режиссер: {director}
          </Typography>
          <Typography variant="body2" component="span" sx={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>
            Параметры
          </Typography>
          <Typography variant="body2" component="span" sx={{ fontSize: '16px', display: 'block' }}>
            Год производства: {year}
          </Typography>
          <Typography variant="body2" component="span" sx={{ fontSize: '16px', display: 'block' }}>
            Длительность: {runtime} минут
          </Typography>
          <Typography>Жанры: {genres ? genres.join(', ') : ''}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Actors actors={actors} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: '20px', fontWeight: 'bold', mt: '13px', display: 'block' }}
          >
            Описание
          </Typography>
          <br />
          <Typography variant="body2" component="span" sx={{ fontSize: '16px', display: 'block' }}>
            {plot}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" component="span" sx={{ fontSize: '16px' }}>
              Рейтинг:
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{ display: 'flex', alignItems: 'center', fontSize: '16px', ml: '50px' }}
            >
              <Rating rating={rating} />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
