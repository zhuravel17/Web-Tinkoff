export const Rating = ({ rating }) => {
  return rating ? (
    <span style={{ fontWeight: 'bold', fontWeigth: '700', fontSize: '32px', color: '#D494DB' }}> {rating}</span>
  ) : (
    <span style={{ fontWeight: 'bold', fontWeigth: '700', fontSize: '32px', color: '#D494DB', marginTop: '-5px' }}>
      {' '}
      -
    </span>
  );
};
