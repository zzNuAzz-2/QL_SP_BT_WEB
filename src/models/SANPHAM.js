module.exports = (sequelize, Sequelize) => {
  const SANPHAM = sequelize.define('SANPHAM', {
    ma_san_pham: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    ten_san_pham: {
      type: Sequelize.STRING,
      allowNull: false
    },
    don_gia: {
      type: Sequelize.STRING,
      allowNull: false
    },
    loai: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  SANPHAM.associate = models => {
    SANPHAM.belongsTo(models.LOAISANPHAM, {
      foreignKey: 'loai',
      targetKey: 'ma_loai'
    })
  };
  return SANPHAM;
};
