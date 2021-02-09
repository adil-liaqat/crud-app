import {Sequelize, DataTypes, ModelAttributes} from 'sequelize';
import * as httpErrors from 'http-errors';

import {
  ContactAttributes,
  ContactInterface,
  Contact,
} from '../interfaces/models/contact.interface';

export const ContactFactory = (sequelize: Sequelize): ContactInterface => {

  const ContactModel: ContactInterface =
    <ContactInterface>sequelize.define<Contact>('contact', <ModelAttributes<Contact, ContactAttributes>>{
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allownull: false,
    },
    contact_id: {
      type: DataTypes.BIGINT,
      allownull: false,
    },
  }, {
    tableName: 'contact',
  })


  return ContactModel;
}
