
module.exports = (sequelize, DataTypes) => {
  const SingleLineAnswers = sequelize.define("SingleLineAnswers", {
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
      type: DataTypes.STRING
    }
  },
    {
      tableName: "single-line-answers",
      timestamps: false,
    },
  )
  SingleLineAnswers.associate = (models) => {
    SingleLineAnswers.belongsTo(models.Responses, { foreignKey: "response_id" });
    SingleLineAnswers.belongsTo(models.Questions, { foreignKey: "question_id" });
  };

  return SingleLineAnswers
}
