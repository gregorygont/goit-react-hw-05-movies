import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../Api/apiService';
import { useState, useEffect } from 'react';
import {
  Button,
  GenresList,
  InfoBox,
  LinkBack,
  MovieBox,
  MovieInfo,
  Title,
} from './MovieDetails.styled';

import { HiArrowNarrowLeft } from 'react-icons/hi';

const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const location = useLocation();
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId).then(data => setMovieDetail(data));
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } =
    movieDetail;
  const score = vote_average * 10;
  const scoreToFixed = score.toFixed(2);
  return (
    <main>
      <Button type="button">
        <LinkBack to={location.state?.from ?? '/'}>
          <HiArrowNarrowLeft size={16} />
          Go back
        </LinkBack>
      </Button>
      <MovieBox>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : `http://www.suryalaya.org/images/no_image.jpg`
          }
          width={320}
          height={380}
          loading="lazy"
          alt="poster"
        />
        <MovieInfo>
          <Title>{original_title}</Title>
          <h3>User score: {scoreToFixed}%</h3>
          <h3>Overview</h3>
          <p>{overview} </p>
          <h3>Genres</h3>
          <GenresList>
            {genres &&
              genres.length &&
              genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </GenresList>
        </MovieInfo>
      </MovieBox>
      <InfoBox>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast" state={{ ...location.state }}>
              Cast
            </Link>
          </li>
          <li>
            {' '}
            <Link to="reviews" state={{ ...location.state }}>
              Reviews
            </Link>
          </li>
        </ul>
      </InfoBox>
      <Outlet />
    </main>
  );
};

export default MovieDetails;

// Імпорт необхідних залежностей з бібліотеки React і зовнішніх модулів, таких як react-router-dom та
// react-icons.
// Оголошення компонента MovieDetails, який буде відображати деталі фільму.
// Використання useState для створення стану movieDetail, який буде містити інформацію про
// деталі фільму.
// Використання useLocation() для отримання поточного об'єкта маршруту з роутера. Це дозволяє
// отримати інформацію про поточний шлях URL та може бути використане для переходу назад після
// натискання кнопки "Go back".
// Використання useParams() для отримання параметра movieId з URL. Це використовується для отримання
// інформації про певний фільм за його id.
// Використання useEffect для отримання деталей фільму під час завантаження компонента.
// Функція getMovieDetails(movieId) використовується для отримання інформації про фільм, і результат
// зберігається в стані movieDetail.
// Деструктуризація деяких полів із об'єкта movieDetail, таких як original_title, overview, genres,
// poster_path і vote_average, для відображення їх на сторінці.
// Повернення JSX-структури, яка буде відображати деталі фільму.
// Кнопка "Go back", яка містить посилання на попередню сторінку або кореневий маршрут.
// Це залежить від того, звідки було здійснено перехід на сторінку деталей фільму.
// Інформація про фільм, яка відображається у блоку <MovieBox>. Вона включає зображення постера
// фільму, заголовок, оцінку користувачів, огляд, жанри та інші деталі.
// Посилання на сторінки "Cast" та "Reviews", які відображаються у блоку <InfoBox>. Вони додають
// посилання на підмаршрути cast та reviews, а також передають поточний стан location.state для
// збереження контексту навігації.
// <Outlet /> використовується для відображення вкладених маршрутів, таких як cast і reviews.
// Отже, цей компонент MovieDetails відображає деталі певного фільму, включаючи посилання на відгуки
// та акторів, і також може вміщувати вкладені маршрути для відображення відгуків та акторів.
