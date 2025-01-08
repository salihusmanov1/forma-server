
module.exports = (sequelize, DataTypes) => {
  const MultiLineAnswers = sequelize.define("MultiLineAnswers", {
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
      type: DataTypes.TEXT
    }
  },
    {
      tableName: "multi-line-answers",
      timestamps: false,
    },
  )
  MultiLineAnswers.associate = (models) => {
    MultiLineAnswers.belongsTo(models.Responses, { foreignKey: "response_id" });
    MultiLineAnswers.belongsTo(models.Questions, { foreignKey: "question_id" });
  };

  return MultiLineAnswers
}
