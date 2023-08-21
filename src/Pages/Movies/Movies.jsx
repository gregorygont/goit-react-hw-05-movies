import { Loader } from 'components/Loader/Loader';
import { MovieList, MovieLink } from 'Pages/Home/Home.styled';
import { useState, useEffect } from 'react';
import { searchMovies } from './../../Api/apiService';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SearchBar } from './../../components/SearchBar/SearchBar';

const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movieName') ?? '';
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (movieName === '') {
      return;
    }
    setMoviesList([]);
    setIsLoading(true);

    searchMovies(movieName).then(data => {
      if (!data.results.length) {
        setIsLoading(false);
        setError(true);
        return console.log(
          'There is no movies with this request. Please, try again'
        );
      }
      setError(false);
      setMoviesList(data.results);
      setIsLoading(false);
    });
  }, [movieName]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    setSearchParams({ movieName: searchForm.elements.movieName.value });
    searchForm.reset();
  };
  return (
    <main>
      <SearchBar onSubmit={handleSubmit} />
      {error && <p>There is no movies with this request. Please, try again</p>}
      <MovieList>
        {moviesList.map(movie => {
          return (
            <li key={movie.id}>
              <MovieLink to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title || movie.name}
              </MovieLink>
            </li>
          );
        })}
        {isLoading && <Loader />}
      </MovieList>
    </main>
  );
};

export default Movies;

// Імпорт необхідних модулів та компонентів.
// Використання хуків useLocation та useSearchParams з бібліотеки react-router-dom для отримання
// і керування параметрами URL.
// Створення стану компонента за допомогою хуків useState для збереження списку фільмів, статусу
// завантаження та наявності помилки.
// Використання ефекту useEffect, який реагує на зміну параметра movieName (переданого в URL) і
// виконує запит до API для пошуку фільмів за цим іменем.
// Якщо результати пошуку пусті, компонент встановлює стан error на true і виводить повідомлення
// про відсутність фільмів за даною назвою.
// В іншому випадку, компонент встановлює стан moviesList на отримані результати пошуку.
// Є також функція handleSubmit, яка спрацьовує при поданні форми пошуку і встановлює параметр
// movieName в URL.
// Отримання компонента SearchBar для введення пошукового запиту.
// Відображення повідомлення про помилку, якщо error дорівнює true.
// Відображення списку фільмів у вигляді посилань. Кожен фільм має унікальний ідентифікатор (key)
// та лінк, який містить ідентифікатор фільму у URL.
// Відображення компонента Loader під час завантаження даних (якщо isLoading дорівнює true).
// Даний компонент відображає форму пошуку фільмів, список знайдених фільмів та повідомлення про
// помилку або завантаження в залежності від стану компонента.
