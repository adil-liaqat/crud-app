import * as httpErrors from 'http-errors';
import { User, UserAttributes } from '../interfaces/models/user.interface';
import { db } from '../models';
import { IRequest, IResponse } from '../interfaces/express';
import { UserCreation } from 'interfaces/controllers/user.controller';
import { difference, uniq } from 'lodash';
import { convertToArray } from '../helpers';

export default class UserController {
  public async createUser(req: IRequest, res: IResponse): Promise<any> {
    const {name, surname, email, age, birthday, gender, phone, contacts} = <UserCreation>req.body;
    const contactList: Array<number | string> = convertToArray(contacts) || [];
    const obj = {
      email,
      name,
      surname,
      age: age || null,
      birthday: birthday || null,
      gender,
      phone: phone || null,
      ...!contactList.length ? {} : {
        usercontacts: uniq(contactList).map((v: number) => ({contact_id: v})),
      },
    };
    const user: UserAttributes = await db.sequelize.transaction(
      async (transaction) => db.User.create(obj, {
        include: [{
          model: db.Contact,
          as: 'usercontacts',
        }],
        transaction,
      }),
    );
    res.json(user);
  }

  public async updateUser(req: IRequest, res: IResponse): Promise<any> {
    const {id} = req.params;
    const {name, surname, age, birthday, gender, phone, contacts} = <UserCreation>req.body;

    const user: User = await db.User.findByPk(id, {
      include: [{
        model: db.Contact,
        as: 'usercontacts',
        required: false,
      }],
    });

    if (!user) {
      throw new httpErrors.NotFound('User not found');
    }

    const contactList: Array<number | string> = convertToArray(contacts) || [];

    const assignedIds = user.usercontacts.map((u) => u.contact_id);

    const toDelete: number[] = difference(assignedIds, contactList);
    const toAdd: number[] = difference(contactList, assignedIds);

    const obj = {
      name,
      surname,
      age: age || null,
      birthday: birthday || null,
      gender,
      phone: phone || null,
    };

    await db.sequelize.transaction(
      async (transaction) => Promise.all([
        user.update(obj, {
          transaction,
        }),
        db.Contact.bulkCreate(toAdd.map((v) => ({
          user_id: user.id,
          contact_id: v,
        })), {
          transaction,
        }),
        db.Contact.destroy({
          where: {
            contact_id: {
              [db.Op.in]: toDelete,
            },
            user_id: user.id,
          },
          transaction,
        }),
      ]),
    );

    res.json(user);
  }

  public async getUsers(req: IRequest, res: IResponse): Promise<any> {
    const {offset = 0, limit = 10} = req.query;

    if (isNaN(<number>offset) || isNaN(<number>limit)) {
      throw new httpErrors.UnprocessableEntity('offset and limit must be a number');
    }

    const _limit: number = Math.abs(+limit) || 1;
    let _offset: number = Math.abs(+offset) || 0;
    _offset = _offset * _limit;

    const users: UserAttributes[] = await db.User.findAll({
      limit: _limit,
      offset: _offset,
      order: [['email', 'desc']],
      include: [{
        model: db.User,
        as: 'contacts',
        through: {
          attributes: [],
        },
      }],
    });
    res.json(users);
  }

  public async getUserById(req: IRequest, res: IResponse): Promise<any> {
    const user: User = await db.User.findByPk(req.params.id, {
      include: [{
        model: db.User,
        as: 'contacts',
        through: {
          attributes: [],
        },
      }],
    });
    if (!user) {
      throw new httpErrors.NotFound('User not found');
    }
    res.json(user.toJSON());
  }

  public async deleteUser(req: IRequest, res: IResponse): Promise<any> {
    const user: User = await db.User.findByPk(req.params.id);
    if (!user) {
      throw new httpErrors.NotFound('User not found');
    }
    await user.destroy();
    res.json(user.toJSON());
  }
}

export const userController = new UserController();
