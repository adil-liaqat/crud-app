import {Sequelize, DataTypes, ModelAttributes} from 'sequelize';
import * as httpErrors from 'http-errors';

import {
  UserAttributes,
  UserInterface,
  User,
} from '../interfaces/models/user.interface';

export const UserFactory = (sequelize: Sequelize): UserInterface => {

  const UserModel: UserInterface = <UserInterface>sequelize.define<User>('user', <ModelAttributes<User, UserAttributes>>{
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    fullname: {
      type: DataTypes.VIRTUAL,
      get(this: User) {
        return `${this.name} ${this.surname}`;
      },
      set() {
        throw new httpErrors.BadRequest('Do not try to set the `fullname` value!');
      },
    },
  }, {
    tableName: 'user',
  })

  UserModel.prototype.toJSON = function(this: User): UserAttributes {
    const values: UserAttributes = Object.assign({}, this.get());
    return <UserAttributes>values;
  };


  UserModel.associate = function(models: any) {
    UserModel.belongsToMany(models.User, {
      through: models.Contact,
      foreignKey: 'user_id',
      as: 'contacts',
    });

    UserModel.belongsToMany(models.User, {
      through: models.Contact,
      foreignKey: 'contact_id',
      as: 'contactslist',
    });

    UserModel.hasMany(models.Contact, {
      foreignKey: 'user_id',
      as: 'usercontacts',
    });
  }

  return UserModel;
}
