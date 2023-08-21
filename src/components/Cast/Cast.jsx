import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from './../../Api/apiService';
import { CastItem, CastList, Character, Name } from './Cast.styled';

const Cast = () => {
  const [castList, setCastList] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getMovieCredits(movieId).then(data => setCastList(data.cast));
  }, [movieId]);
  return (
    <CastList>
      {castList.length > 0
        ? castList.map(({ id, name, profile_path, character }) => (
            <CastItem key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : `http://www.suryalaya.org/images/no_image.jpg`
                }
                alt="actor"
                loading="lazy"
                width={120}
                height={180}
              />
              <Name>{name}</Name>
              <Character> Character: {character}</Character>
            </CastItem>
          ))
        : "Sorry, there isn't any info :("}
    </CastList>
  );
};

export default Cast;

// Імпорт необхідних залежностей з бібліотеки React і зовнішнього модуля react-router-dom.
// Оголошення компонента Cast, який буде відображати спискок акторів у фільмі.
// Використання useState для створення стану castList, який буде містити інформацію про акторів.
// Використання useParams() з react-router-dom для отримання параметра movieId з URL. Цей параметр буде
// використовуватися для отримання інформації про акторів, які знялися у вказаному фільмі.
// Використання useEffect для отримання інформації про акторів після того, як компонент відмонтовано.
// Функція getMovieCredits(movieId) використовується для отримання списку акторів для заданого movieId,
// і результат зберігається в стані castList.
// Повернення JSX-структури, яка буде відображати список акторів у фільмі.
// Використання тернарного оператора для перевірки, чи є актори в списку. Якщо так, то відбувається маппінг
// кожного актора на JSX-структуру, де відображається ім'я актора, його фотографія (якщо є), та персонаж,
// якого він грає у фільмі.
// Якщо список акторів порожній, відображається повідомлення "Sorry, there isn't any info :(".
// Узагальнюючи, цей компонент Cast використовує параметр movieId з URL, отримує інформацію про акторів
// для певного фільму за допомогою зовнішнього API-запиту, та відображає їх у вигляді списку з відповідною інформацією.
