import { Model, ModelCtor, Optional } from 'sequelize/types';


export interface UserAttributes {
  id: number;
  name: string;
  surname: string;
  fullname: string;
  age: number;
  gender: string;
  birthday: Date;
  phone: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}


export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'age' | 'gender' | 'birthday' | 'phone' | 'fullname'> {}

export interface User
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      usercontacts: Array<any>;
      toJSON(): UserAttributes
    }

export interface UserInterface extends ModelCtor<User> {
  associate(models: object): void;
}
