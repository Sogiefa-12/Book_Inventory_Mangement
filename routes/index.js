const express = require('express');
const router = express.Router();

const passport = require('passport');
const ensureAuthenticated = require('../middleware/oauth');

const { getAllBooks, getSingleBook, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { getAllAuthors, getSingleAuthor, getAuthorWithBooks, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const validation = require('../middleware/validate');


router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  req.session.userId = req.user.id; // Save user's ID in the session
  res.redirect('/');
});

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

router.get('/', getAllBooks);
router.post('/',ensureAuthenticated, validation.saveBook,createBook);
router.get('/:id', getSingleBook);
router.put('/:id',ensureAuthenticated, validation.saveBook, updateBook);
router.delete('/:id',ensureAuthenticated, deleteBook);

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




router.get('/', getAllAuthors);
router.post('/', ensureAuthenticated, validation.saveAuthor, createAuthor);
router.get('/:id', getSingleAuthor);
router.put('/:id', ensureAuthenticated, validation.saveAuthor, updateAuthor);
router.delete('/:id', ensureAuthenticated, deleteAuthor);


// router.get('/logout', (req, res) => {
//     req.logout((err) => {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
//   });


module.exports = router;