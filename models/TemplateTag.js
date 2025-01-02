
module.exports = (sequelize, DataTypes) => {
  const TemplateTag = sequelize.define("TemplateTag", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    template_id: {
      references: {
        model: "templates",
        key: "id"
      },
      type: DataTypes.INTEGER
    },
    tag_id: {
      references: {
        model: "tags",
        key: "id"
      },
      type: DataTypes.INTEGER
    }

  },
    {
      tableName: "template_tag",
      timestamps: false,
    },
  )

  TemplateTag.associate = (models) => {
    TemplateTag.belongsTo(models.Templates, { foreignKey: 'template_id' });
    TemplateTag.belongsTo(models.Tags, { foreignKey: 'tag_id' });
  };
  return TemplateTag

}
