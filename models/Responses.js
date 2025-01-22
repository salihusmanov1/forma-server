
module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define("Responses", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    form_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "forms",
        key: "id"
      }
    },
    respondent_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      }
    },
  },
    {
      tableName: "responses",
      timestamps: true,
    },
  )
  Responses.associate = (models) => {
    Responses.belongsTo(models.Users, { foreignKey: "respondent_id", as: 'respondent' });
    Responses.belongsTo(models.Forms, { foreignKey: "form_id", as: "response" });
    Responses.hasMany(models.SingleLineAnswers, { foreignKey: "response_id", });
    Responses.hasMany(models.MultiLineAnswers, { foreignKey: "response_id" });
    Responses.hasMany(models.NumericAnswers, { foreignKey: "response_id" });
    Responses.hasMany(models.CheckboxAnswers, { foreignKey: "response_id" });
  };

  return Responses

}
