import React from 'react';

import { BigButton } from '../../componenst';

import styles from './RegisterForm.module.scss';

export const RegisterForm: React.FC = () => {
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [
    1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932,
    1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948,
    1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964,
    1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
    1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996,
    1997, 1998, 1999, 2000, 2001, 2002, 2003,
  ];

  return (
    <div className={styles.createAccount_form}>
      <h2>СОЗДАТЬ АККАУНТ</h2>
      <p>Создайте аккаунт и присоединитесь к нашему сообществу любителей суши</p>
      <form action="">
        <div className={styles.gender_block}>
          <label>
            <input type="radio" name="gender" id="male" value="male" />
            Мужчина
          </label>
          <label>
            <input type="radio" name="gender" id="female" value="female" checked />
            Женщина
          </label>
        </div>
        <label htmlFor="name">
          Имя
          <input type="text" name="name" placeholder="Дмитрий" required />
        </label>
        <label htmlFor="lastName">
          Фамилия
          <input type="text" name="lastName" placeholder="Петров" required />
        </label>
        <label htmlFor="phoneNumber">
          Телефон
          <input type="text" name="phoneNumber" placeholder="+79553654955" required />
        </label>
        <label className={styles.date_block}>
          <span>День рождения</span>
          <select name="day" title="День рождения" id="day" required>
            <option value="">День</option>
            {dates.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select name="month" title="Месяц рождения" id="month" required>
            <option value="">Месяц</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select name="year" title="Год рождения" id="year" required>
            <option value="">Год</option>
            {years
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              .reverse()}
          </select>
        </label>
        <label htmlFor="email">
          Email
          <input type="text" name="email" placeholder="myawesomeemail@email.com" />
        </label>
        <label htmlFor="pass">
          Пароль
          <input type="text" name="pass" placeholder="********" required />
          <div>
            <span>от 8 символов</span>
            <span>мин. одна заглавная</span>
            <span>мин. одна строчная</span>
            <span>мин. один символ</span>
          </div>
        </label>
        <div className={styles.divider} />
        <label htmlFor="terms">
          <input type="checkbox" name="terms" id="terms" required />
          <div>
            <p>Я прочёл и согласен с условиями создания аккаунта</p>
          </div>
        </label>
        <label htmlFor="news">
          <input type="checkbox" name="news" id="news" />
          <div>
            <p>Я хочу получать уведомления о новых акциях</p>
          </div>
        </label>
        <label htmlFor="loyalty">
          <input type="checkbox" name="loyalty" id="loyalty" />
          <div>
            <p>Я хочу участвовать в программе лояльности от Sushidream</p>
          </div>
        </label>
      </form>
      <BigButton text={'Создать аккаунт'} />
    </div>
  );
};
