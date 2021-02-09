import { Model, ModelCtor, Optional } from 'sequelize/types';


export interface ContactAttributes {
  id: number;
  user_id: number;
  contact_id: number;
}


export interface ContactCreationAttributes
  extends Optional<ContactAttributes, 'id'> {}

export interface Contact
  extends Model<ContactAttributes, ContactCreationAttributes>,
    ContactAttributes {
      toJSON(): ContactAttributes
    }

export interface ContactInterface extends ModelCtor<Contact> {
}
