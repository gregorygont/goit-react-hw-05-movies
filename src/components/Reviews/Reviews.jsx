import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviews } from 'Api/apiService';

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getReviews(movieId).then(data => setReviewsList(data.results));
  }, [movieId]);

  return (
    <ul>
      {reviewsList.length > 0
        ? reviewsList.map(({ author, content, id }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))
        : "Sorry, we don't have any review for this movie"}
    </ul>
  );
};
export default Reviews;

// Цей код представляє компонент Reviews, який відображає список відгуків для певного фільму.
// Імпорт необхідних залежностей з бібліотеки React і зовнішнього модуля react-router-dom.
// Оголошення компонента Reviews, який буде відображати список відгуків.
// Використання useState для створення стану reviewsList, який буде містити інформацію про відгуки.
// Використання useParams() з react-router-dom для отримання параметра movieId з URL. Цей параметр буде
// використовуватися для отримання відгуків для вказаного фільму.
// Використання useEffect для отримання відгуків після того, як компонент відмонтовано.
// Функція getReviews(movieId) використовується для отримання списку відгуків для заданого movieId,
// і результат зберігається в стані reviewsList.
// Повернення JSX-структури, яка буде відображати список відгуків.
// Використання тернарного оператора для перевірки, чи є відгуки в списку. Якщо так, то відбувається маппінг
// кожного відгуку на JSX-структуру, де відображається автор відгуку та його вміст.
// Якщо список відгуків порожній, відображається повідомлення "Sorry, we don't have any review for this movie".
// Отже, цей компонент Reviews використовує параметр movieId з URL, отримує інформацію про відгуки для
// певного фільму за допомогою зовнішнього API-запиту, та відображає їх у вигляді списку з відповідною інформацією.
