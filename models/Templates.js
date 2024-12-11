
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
    },
    template_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
    {
      tableName: "templates",
      timestamps: true,
    },
  )
  Templates.associate = (models) => {
    Templates.belongsTo(models.Users, { foreignKey: "author_id" });
  };
  return Templates

}
