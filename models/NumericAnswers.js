
module.exports = (sequelize, DataTypes) => {
  const NumericAnswers = sequelize.define("NumericAnswers", {
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
    },
    question_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "questions",
        key: "id"
      }
    },
    answer: {
      allowNull: true,
      type: DataTypes.FLOAT
    }
  },
    {
      tableName: "numeric-answers",
      timestamps: false,
    },
  )
  NumericAnswers.associate = (models) => {
    NumericAnswers.belongsTo(models.Responses, { foreignKey: "response_id" });
    NumericAnswers.belongsTo(models.Questions, { foreignKey: "question_id" });
  };

  return NumericAnswers
}
