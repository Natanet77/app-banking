// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { Notification } = require('../class/notification')
const { Transaction } = require('../class/transaction')

User.create({
  email: 'test@mail.com',
  password: 123,
  role: 1,
})

// User.create({
//   email: 'admin@mail.com',
//   password: 123,
//   role: 2,
// })

// User.create({
//   email: 'developer@mail.com',
//   password: 123,
//   role: 3,
// })

// ================================================================

// router.get Створює нам один ентпоїнт
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

router.post('/signup', function (req, res) {
  const { email, password } = req.body
  console.log(email, password)
  let token = ''

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message:
          'A user with the same name is already exist',
      })
    }

    const newUser = User.create({ email, password })

    const session = Session.create(newUser)
    token = session.token

    Confirm.create(newUser.email)

    Notification.create(session, {
      operation: 'SIGNUP',
      status: 'SUCCESS',
      message: 'Користувач успішно зареєстрований',
    })

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      session,
    })
  } catch (err) {
    Notification.create(
      { token: token, user: { email: email } },
      {
        operation: 'SIGNUP',
        status: 'ERROR',
        message: err.message,
      },
    )

    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

router.post('/signin', function (req, res) {
  const { email, password } = req.body
  console.log(email, password)
  let token = ''

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Такий email не зареєстрований. Для реєстрації натисніть Sign Up.',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message:
          'Невірний пароль. Для відновлення паролю натисніть Restore.',
      })
    }

    const session = Session.create(user)
    token = session.token

    Confirm.create(user.email)

    Notification.create(session, {
      operation: 'SIGNIN',
      status: 'SUCCESS',
      message: 'Користувач успішно зайшов в систему',
    })

    return res.status(200).json({
      message: 'Користувач успішно зайшов в систему',
      session,
    })
  } catch (err) {
    Notification.create(
      { token: token, user: { email: email } },
      {
        operation: 'SIGNIN',
        status: 'ERROR',
        message: err.message,
      },
    )

    return res.status(400).json({
      message: 'Помилка входу в систему',
    })
  }
})
