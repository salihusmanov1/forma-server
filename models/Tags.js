
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define("Tags", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  },
    {
      tableName: "tags",
      timestamps: false,
    },
  )

  Tags.associate = (models) => {
    Tags.belongsToMany(models.Templates, { through: 'TemplateTag', foreignKey: "tag_id" });
  };
  return Tags

}
