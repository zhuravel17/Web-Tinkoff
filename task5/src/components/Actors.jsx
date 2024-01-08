import { Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const Actors = ({ actors }) => {
  const actorsArray = actors?.split(',');
  const renderActors = actorsArray ? actorsArray.slice(0, 5) : [];
  const otherActors = actorsArray ? actorsArray.slice(5) : [];
  return renderActors.at(0) === '' ? (
    <Typography variant="body2" component="span" sx={{ fontSize: '16px', display: 'block' }}>
      Список актеров пуст
    </Typography>
  ) : (
    <>
      <Typography variant="body2" component="span" sx={{ fontSize: '16px', display: 'block' }}>
        В главных ролях: <br />
        {renderActors.map(actor => (
          <div key={actor}>{actor}</div>
        ))}
      </Typography>

      <Typography variant="body2" component="span" sx={{ fontSize: '16px', color: '#336FEE', display: 'block' }}>
        {actorsArray.length > 5 ? (
          <Typography>
            <Tooltip title={otherActors}>
              <span>Остальные {actorsArray.length - 5}</span>
            </Tooltip>
          </Typography>
        ) : (
          false
        )}
      </Typography>
    </>
  );
};

Actors.propTypes = {
  actors: PropTypes.string,
};
