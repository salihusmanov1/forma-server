
module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define("Options", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question_id: {
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      },
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    }

  },
    {
      tableName: "options",
      timestamps: false,
    },
  )
  Options.associate = (models) => {
    Options.belongsTo(models.Questions, { foreignKey: "question_id" });
  };
  return Options

}
