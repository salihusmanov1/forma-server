
module.exports = (sequelize, DataTypes) => {
  const CheckboxAnswers = sequelize.define("CheckboxAnswers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    response_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "responses",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    question_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "questions",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    option_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "options",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    answer: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    }
  },
    {
      tableName: "checkbox-answers",
      timestamps: false,
    },
  )
  CheckboxAnswers.associate = (models) => {
    CheckboxAnswers.belongsTo(models.Responses, { foreignKey: "response_id" });
    CheckboxAnswers.belongsTo(models.Questions, { foreignKey: "question_id" });
    CheckboxAnswers.belongsTo(models.Options, { foreignKey: "option_id", as: 'option' });
  };

  return CheckboxAnswers
}
