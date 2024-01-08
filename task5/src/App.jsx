import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListPage, MovieCard } from './pages';
import { CreateFormPage } from './pages/create-form-page/CreateFormPage.jsx';
import { EditFormPage } from './pages/edit-form-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ListPage />} path={'/*'}>
          <Route path={'movie/:id'} element={<MovieCard />} />
          <Route path={'movie/:id/edit'} element={<EditFormPage />} />
          <Route path={'movie/create'} element={<CreateFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
