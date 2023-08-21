import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';

const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));
const Home = lazy(() => import('Pages/Home/Home'));
const MovieDetails = lazy(() => import('Pages/MovieDetails/MovieDetails'));
const Movies = lazy(() => import('Pages/Movies/Movies'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

// Тут використовується бібліотека React Router для визначення маршрутів і компонентів, які мають
// відображатися на кожному з цих маршрутів.
// Імпортування необхідних компонентів за допомогою функції lazy з методом import.
// Це динамічне завантаження компонентів, що допомагає зменшити величезний початковий бандл цього додатку.
// Визначення основного компонента App, який буде єдиним відображеним вузлом на сторінці.
// Використання Routes для визначення набору маршрутів для цього додатку.
// Оголошення кореневого маршруту '/', який використовує компонент <SharedLayout /> в якості елементу.
// Він містить в собі додаткову структуру, яка буде спільною для всіх дочірніх маршрутів.
// Оголошення дочірніх маршрутів кореневого маршруту:
// Маршрут '/' (індексний маршрут) відображає компонент <Home />.
// Маршрут '/movies' відображає компонент <Movies />.
// Оголошення вкладених маршрутів 'movies/:movieId', який відображає компонент <MovieDetails />.
// Цей маршрут приймає параметр movieId.
// Для маршруту 'movies/:movieId' також оголошені вкладені маршрути:
// '/cast' відображає компонент <Cast />.
// '/reviews' відображає компонент <Reviews />.
// Останній маршрут '/*' буде використовуватися, якщо жоден з вищезазначених маршрутів не відповідає запиту.
// В цьому випадку також відображається компонент <Home />.
// Отже, загалом, цей код визначає набір маршрутів для відображення різних компонентів в залежності від
// шляху URL. Він використовує динамічне завантаження компонентів, що дозволяє зменшити час завантаження
// сторінки і використовує вкладені маршрути для подальшої організації структури додатка.
