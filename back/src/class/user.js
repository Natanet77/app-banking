class User {
  // static USER_ROLE = { USER: 1, ADMIN: 2, DEVELOPER: 3 }
  static #list = []
  static #count = 1

  constructor({ email, password }) {
    this.id = User.#count++

    this.email = String(email).toLowerCase()
    // this.email = email
    this.password = String(password)
    // this.role = User.#convertRole(role)
    this.isConfirm = false
  }

  // static #convertRole = (role) => {
  //   role = Number(role)

  //   if (isNaN(role)) {
  //     role = this.USER_ROLE.USER
  //   }

  //   role = Object.values(this.USER_ROLE).includes(role)
  //     ? role
  //     : this.USER_ROLE.USER

  //   return role
  // }

  static create(data) {
    const user = new User(data)
    console.log(user)
    this.#list.push(user)
    console.log(this.#list)
    return user
  }

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) => user.email === email,
        // user.email === String(email).toLowerCase(),
      ) || null
    )
  }

  static getList = () => this.#list

  static getListEmail = () =>
    this.#list.map((user) => user.email)

  static getById(id) {
    return this.#list.find((user) => user.id === id) || null
  }

  static getByPassword(password) {
    return (
      this.#list.find(
        (user) => user.password === String(password),
      ) || null
    )
  }
}

module.exports = { User }
