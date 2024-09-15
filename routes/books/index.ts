import { Router } from 'express';
import { body } from 'express-validator';
import {createNewBook, deleteBook, editBook, getAllBooks, getSpecificBook} from "../../controllers/books-controller";

const router: Router = Router();

const bookValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('year')
        .notEmpty()
        .withMessage('The books year is required')
        .isNumeric()
        .withMessage('The year has to be a number')
];

router.get('/', getAllBooks);
router.get('/:id', getSpecificBook);
router.post('/', bookValidationRules, createNewBook);
router.put('/:id', bookValidationRules, editBook);
router.delete('/:id', deleteBook);

export default router;
