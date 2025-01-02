
module.exports = (sequelize, DataTypes) => {
  const AllowedUsers = sequelize.define("AllowedUsers", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    form_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "forms",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    user_email: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "email"
      },
      onDelete: "CASCADE"
    }
  },
    {
      tableName: "allowed-users",
      timestamps: false,
    },
  )

  AllowedUsers.associate = (models) => {
    AllowedUsers.belongsTo(models.Forms, { foreignKey: "form_id" });
    AllowedUsers.belongsTo(models.Users, { foreignKey: "user_email" });
  };
  return AllowedUsers

}
