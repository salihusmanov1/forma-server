
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    template_id: {
      allowNull: false,
      references: {
        model: "templates",
        key: "id"
      },
      type: DataTypes.INTEGER
    },
    question: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },

  },
    {
      tableName: "questions",
      timestamps: false,
    },
  )
  Questions.associate = (models) => {
    Questions.belongsTo(models.Templates, { foreignKey: "template_id" });
    Questions.hasMany(models.Options, { foreignKey: "question_id", as: 'options' });
    Questions.hasMany(models.SingleLineAnswers, { foreignKey: "response_id" });
    Questions.hasMany(models.MultiLineAnswers, { foreignKey: "response_id" });
    Questions.hasMany(models.NumericAnswers, { foreignKey: "response_id" });
    Questions.hasMany(models.CheckboxAnswers, { foreignKey: "response_id" });
  };
  return Questions

}
