import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

export function MovieListCard({ movie }) {
  const { id: movieId } = useParams();
  const { actors, director, genres, id, plot, posterUrl, runtime, title, year, rating } = movie;
  return (
    <Link to={`/movie/${id}`}>
      <Card
        sx={{
          minWidth: 110,
          borderRadius: 3,
          m: 2,
          '&:hover': {
            border: '1px solid black',
          },
          background: id == movieId ? '#E8C8EA' : 'white',
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography sx={{ mb: 1.5 }}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {year} | {genres.join(', ')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

MovieListCard.propTypes = {
  movie: PropTypes.shape({
    actors: PropTypes.string,
    director: PropTypes.string,
    genres: PropTypes.array,
    id: PropTypes.number,
    plot: PropTypes.string,
    posterUrl: PropTypes.string,
    runtime: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    rating: PropTypes.string,
  }),
};
