
module.exports = (sequelize, DataTypes) => {
  const Templates = sequelize.define("Templates", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    template_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Template name cannot be empty.",
        },
      },
    },
    template_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Template description cannot be empty.",
        },
      },
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    topic_id: {
      validate: {
        notEmpty: {
          msg: "Template topic is required.",
        },
      },
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        models: "topics",
        key: "id"
      },
    },
  },
    {
      tableName: "templates",
      timestamps: true,
    },
  )
  Templates.associate = (models) => {
    Templates.belongsTo(models.Users, { foreignKey: "author_id", as: 'author' });
    Templates.hasMany(models.Questions, { foreignKey: "template_id", as: "questions" });
    Templates.hasMany(models.Forms, { foreignKey: "template_id" });
    Templates.belongsTo(models.Topics, { foreignKey: "topic_id" });
    Templates.belongsToMany(models.Tags, { through: "TemplateTag", foreignKey: "template_id", as: "tags" });
  };

  return Templates

}
