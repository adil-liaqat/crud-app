'use strict';

import { QueryInterface, DataTypes, Sequelize, ModelAttributes } from 'sequelize';

import { Contact, ContactCreationAttributes } from '../interfaces/models/contact.interface';

export = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize): Promise<any> => {
    return queryInterface.createTable('contact', <ModelAttributes<Contact, ContactCreationAttributes>>{
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      contact_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    }).then(_ => queryInterface.addConstraint('contact', {
      type: 'unique',
      name: 'unq_user_contact_key',
      fields: ['user_id', 'contact_id'],
    }));
  },

  down: (queryInterface: QueryInterface, sequelize: Sequelize): Promise<any> => {
    return queryInterface.dropTable('contact');
  },
};
