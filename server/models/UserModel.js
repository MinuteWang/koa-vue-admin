const sequelize = require('./db')
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  accout: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: Sequelize.STRING,
  type: Sequelize.INTEGER
}, {
  tableName: 'user'
})

const createUser = async function (data) {
  await User.create({
    uuid: data.uuid,
    accout: data.accout,
    password: data.password,
    type: data.type
  })
}

const findUser = async function (data) {
  const user = await User.findOne({
    attributes: ['uuid', 'type', 'accout'],
    where: {
      accout: data.accout,
      password: data.password
    }
  })
  return user
}

module.exports = {
  createUser,
  findUser
}
