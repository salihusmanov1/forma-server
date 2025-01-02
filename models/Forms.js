
module.exports = (sequelize, DataTypes) => {
  const Forms = sequelize.define("Forms", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    template_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'templates',
        key: 'id'
      }
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    is_public: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },
    {
      tableName: "Forms",
      timestamps: true,
    },
  )
  Forms.associate = (models) => {
    Forms.belongsTo(models.Templates, { foreignKey: "template_id", as: 'template' });
    Forms.belongsTo(models.Users, { foreignKey: "user_id", as: "form" });
    Forms.hasMany(models.AllowedUsers, {
      foreignKey: "form_id",
      as: "allowed_users",
    });
  };

  return Forms

}
