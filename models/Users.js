const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: "This email is already in use" },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required.",
        },
        isEmail: {
          msg: 'Email must be a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required.",
        },
        len: {
          args: [6, 100],
          msg: 'Password must be at least 8 characters long',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
    },
  },
    {
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      timestamps: true,
      tableName: 'users'
    },
  )
  Users.associate = (models) => {
    Users.hasMany(models.Templates, { foreignKey: "author_id" });
    Users.hasMany(models.Forms, { foreignKey: "user_id", as: 'forms' });
    Users.hasMany(models.AllowedUsers, { foreignKey: "user_email" });
  };
  return Users
}
