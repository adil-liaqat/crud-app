import { Router } from 'express';
import { asyncHandler } from '../helpers';
import { userController } from '../controllers/user.controller';
import validatorMiddleware from '../middlewares/validator.middleware';
import { userCreation, userUpdate } from '../validators/auth.validator';

const router: Router = Router();


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         age:
 *           type: number
 *         gender:
 *           type: string
 *           enum: [male, female]
 *         birthday:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a user
 *     tags:
 *      - User
 *     requestBody:
 *      content:
 *       application/x-www-form-urlencoded:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               required: true
 *             surname:
 *               type: string
 *               required: true
 *             email:
 *               type: string
 *               required: true
 *             phone:
 *               type: string
 *             age:
 *               type: number
 *             gender:
 *               type: string
 *               enum: [male, female]
 *               required: true
 *             contacts:
 *               type: array
 *               description: Array of ids
 *               items:
 *                 type: number
 *             birthday:
 *               type: string
 *               format: date-time
 *     responses:
 *       200:
 *         description: Api response
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       Error:
 *          $ref: '#/components/responses/GenericError'
 */

router.post('/', validatorMiddleware(userCreation), asyncHandler(userController.createUser));


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Update a user
 *     tags:
 *      - User
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: The id of user
 *     requestBody:
 *      content:
 *       application/x-www-form-urlencoded:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               required: true
 *             surname:
 *               type: string
 *               required: true
 *             phone:
 *               type: string
 *             age:
 *               type: number
 *             gender:
 *               type: string
 *               enum: [male, female]
 *               required: true
 *             contacts:
 *               type: array
 *               description: Array of all ids existing and new, otherwise will be deleted
 *               items:
 *                 type: number
 *             birthday:
 *               type: string
 *               format: date-time
 *     responses:
 *       200:
 *         description: Api response
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       Error:
 *          $ref: '#/components/responses/GenericError'
 */

router.put('/:id(\\d+)/', validatorMiddleware(userUpdate), asyncHandler(userController.updateUser));

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     tags:
 *      - User
 *     parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *        description: The number of items to skip before starting to collect the result set
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: The numbers of items to return
 *     responses:
 *       200:
 *         description: Api response
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *       401:
 *          $ref: '#/components/responses/GenericError'
 *       Error:
 *          $ref: '#/components/responses/GenericError'
 */

router.get('/', asyncHandler(userController.getUsers));


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get user by id
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     tags:
 *      - User
 *     responses:
 *       200:
 *         description: Api response
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       401:
 *          $ref: '#/components/responses/GenericError'
 *       Error:
 *          $ref: '#/components/responses/GenericError'
 */

router.get('/:id(\\d+)/', asyncHandler(userController.getUserById));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Delete a user
 *     parameters:
 *     - $ref: '#/components/parameters/id'
 *     tags:
 *      - User
 *     responses:
 *       200:
 *         description: Api response
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       401:
 *          $ref: '#/components/responses/GenericError'
 *       Error:
 *          $ref: '#/components/responses/GenericError'
 */

router.delete('/:id(\\d+)/', asyncHandler(userController.deleteUser));

export default router;
