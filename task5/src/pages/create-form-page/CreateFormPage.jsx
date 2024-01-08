import { Grid } from '@mui/material';
import { CreateForm } from '../../components/CreateForm.jsx';

export function CreateFormPage() {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid item={true} xs={9}>
        <CreateForm />
      </Grid>
    </Grid>
  );
}
