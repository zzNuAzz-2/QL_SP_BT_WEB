module.exports = (sequelize, Sequelize) => {
  const LOAISANPHAM = sequelize.define('LOAISANPHAM', {
    ma_loai: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    ten_loai: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  LOAISANPHAM.associate = models => {
    
  };
  return LOAISANPHAM;
};
