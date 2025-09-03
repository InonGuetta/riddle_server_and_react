import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  average_time_seconds: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'players',
  timestamps: false
});

export default Player;
