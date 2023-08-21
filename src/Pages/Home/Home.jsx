import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MovieLink, MovieList, Title } from './Home.styled';
import { getTrending } from '../../Api/apiService';
import { Loader } from 'components/Loader/Loader';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTrending().then(data => {
      setTrendMovies(data.results);
      setIsLoading(false);
    });
  }, []);

  return (
    <main>
      <Title>Top Movies for today</Title>
      <MovieList>
        {trendMovies.map(movie => (
          <li key={movie.id}>
            <MovieLink to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.original_title || movie.name}
            </MovieLink>
          </li>
        ))}
        {isLoading && <Loader />}
      </MovieList>
    </main>
  );
};
export default Home;

// Цей код визначає компонент Home, який відображає список популярних фільмів на головній сторінці
//додатка.
// Імпорт необхідних залежностей з бібліотеки React і зовнішнього модуля react-router-dom.
// Оголошення компонента Home, який буде відображати список популярних фільмів.
// Використання useState для створення стану trendMovies, який буде містити інформацію про популярні фільми.
// Використання useLocation() для отримання поточного об'єкта маршруту з роутера. Це дозволяє
// отримати інформацію про поточний шлях URL.
// Використання useState для створення стану isLoading, який буде відображати, чи триває завантаження даних.
// Використання useEffect для отримання популярних фільмів під час завантаження компонента.
// Функція getTrending() використовується для отримання списку популярних фільмів, і результат
// зберігається в стані trendMovies. Також встановлюється значення isLoading в true під час
// завантаження і в false після завершення.
// Повернення JSX-структури, яка буде відображати список популярних фільмів.
// Виведення заголовка "Top Movies for today" за допомогою компонента <Title>.
// Відображення списку фільмів за допомогою компонента <MovieList>. Кожен фільм представлений як
// елемент списку <li>, де використовується компонент <MovieLink>, який створює посилання на деталі
// фільму за його id. Також використовується {movie.original_title || movie.name} для виведення назви фільму.
// Якщо завантаження ще триває (isLoading дорівнює true), відображається компонент <Loader />, який,
// відображає анімацію завантаження.
// Отже, цей компонент Home завантажує список популярних фільмів, виводить їх назви та створює
// посилання для переходу до деталей кожного фільму.
