


const express = require('express');
const bookRouter = express.Router();
const authorRouter = express.Router();

const { getAllBooks, getSingleBook, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { getAllAuthors, getSingleAuthor, getAuthorWithBooks, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     operationId: getAllBooks
 *     responses:
 *       '200':
 *         description: Success
 *
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: Success
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     operationId: getSingleBook
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     operationId: updateBook
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Success
 */

/** 
 * @swagger
 * /books/{id}:
 *   delete:
 *      summary: Delete a book by ID
 *      operationId: deleteBook
 *      parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *              type: string
 *      responses:
 *         '204':
 *           description: Success
 */

bookRouter.get('/', getAllBooks);
bookRouter.post('/', createBook);
bookRouter.get('/:id', getSingleBook);
bookRouter.put('/:id', updateBook);
bookRouter.delete('/:id', deleteBook);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       '200':
 *         description: Success
 *   post:
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '201':
 *         description: Success
 * /authors/{id}:
 *   get:
 *     summary: Get a single author by ID
 *     operationId: getSingleAuthor
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *   put:
 *     summary: Update an author by ID
 *     operationId: updateAuthor
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       '200':
 *         description: Success
 *   delete:
 *     summary: Delete an author by ID
 *     operationId: deleteAuthor
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Success
 */

/**
 * @swagger
 * /authors/{id}/books:
 *   get:
 *     summary: Get books written by an author
 *     operationId: getAuthorWithBooks
 *     tags:
 *       - Books Writen By Author
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         authorId:
 *           type: string
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 */

authorRouter.get('/', getAllAuthors);
authorRouter.post('/', createAuthor);
authorRouter.get('/:id', getSingleAuthor);
authorRouter.put('/:id', updateAuthor);
authorRouter.delete('/:id', deleteAuthor);

module.exports = { bookRouter, authorRouter };