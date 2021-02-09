'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, Model, Dialect, Op } from 'sequelize';

// import paginate = require('./globals/pagination');

import * as options from '../config/database';
import {UserFactory} from './user.model';
import {ContactFactory} from './contact.model';

// const basename: string = path.basename(__filename);

const sequelize: Sequelize = new Sequelize(options);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

const models = {
  User: UserFactory(sequelize),
  Contact: ContactFactory(sequelize),
};

Object.keys(models).forEach((modelName: string) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// global.Op = Sequelize.Op;

export const db = {
  sequelize,
  Sequelize,
  Op,
  ...models,
};
