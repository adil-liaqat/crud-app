'use strict';

import { QueryInterface, DataTypes, Sequelize, ModelAttributes } from 'sequelize';

import { User, UserAttributes, UserCreationAttributes } from '../interfaces/models/user.interface';

export = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize): Promise<any> => {
    return queryInterface.createTable('user', <ModelAttributes<User, UserCreationAttributes>>{
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female'],
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.fn('now'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.fn('now'),
      },
    });
  },

  down: (queryInterface: QueryInterface, sequelize: Sequelize): Promise<any> => {
    return queryInterface.dropTable('user');
  },
};
