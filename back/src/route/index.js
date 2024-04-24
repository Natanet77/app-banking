// // Підключаємо роутер до бек-енду
// const express = require('express')
// const router = express.Router()

// // Підключіть файли роутів
// const test = require('./auth')
// // Підключіть інші файли роутів, якщо є

// // Об'єднайте файли роутів за потреби
// router.use('/', auth)
// // Використовуйте інші файли роутів, якщо є

// router.get('/', (req, res) => {
//   res.status(200).json('Hello World')
// })

// // Експортуємо глобальний роутер
// module.exports = router

// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву контейнера
    name: 'index',
    // вказуємо назву компонентів
    component: [],

    // вказуємо назву сторінки
    title: 'Index page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/home', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('home', {
    // вказуємо назву контейнера
    name: 'home',
    // вказуємо назву компонентів
    component: [],

    // вказуємо назву сторінки
    title: 'Home page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/logout', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('logout', {
    // вказуємо назву контейнера
    name: 'logout',
    // вказуємо назву компонентів
    component: [],

    // вказуємо назву сторінки
    title: 'Logout page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// Підключіть файли роутів
const auth = require('./auth')

// Підключіть інші файли роутів, якщо є
// const user = require('./user')

// Об'єднайте файли роутів за потреби
router.use('/', auth)
// router.use('/', user)

// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
