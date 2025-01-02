
module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define("Topics", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }

  },
    {
      tableName: "topics",
      timestamps: false,
    },
  )
  return Topics

}
