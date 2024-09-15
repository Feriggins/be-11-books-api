import { Request, Response } from 'express';
import { Book } from '../models';
import { validationResult } from 'express-validator';
import { HydratedDocument } from 'mongoose';
import {IBook} from "../models/book";

const filterUndefinedAndEmpty = (obj: Record<string, any>): Record<string, any> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, any>);
};

export const getAllBooks = async (req: Request, res: Response): Promise<Response> => {
    return await Book.find().lean()
        .then(books => {
            if (!books) {
                return res.status(500).send([]);
            } else {
                return res.status(200).send(books);
            }
        })
        .catch(err => {
            return res.status(500).send({error: err.message});
        });
};

export const getSpecificBook = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;
    return await Book.findById(id).lean()
        .then(book => {
            if (!book) {
                return res.status(404).send({});
            } else {
                return res.status(200).send(book);
            }
        })
        .catch(err => {
            return res.status(404).send({error: err.message});
        });
};

export const createNewBook = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const filteredBody = filterUndefinedAndEmpty(req.body);
    const newBook: HydratedDocument<IBook> = new Book(filteredBody);

    return await newBook.save()
        .then(savedBook => {
            return res.status(200).send(savedBook);
        })
        .catch(err => {
            return res.status(500).send({error: err.message});
        });
};

export const editBook = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const {id} = req.params;
    const updateData = filterUndefinedAndEmpty(req.body);

    return await Book.findByIdAndUpdate(
        id,
        updateData,
        {new: true, runValidators: true}
    )
        .then((updatedBook) => {
            if (!updatedBook) {
                return res.status(404).send({message: 'Book not found'});
            }
            return res.status(200).send(updatedBook);
        })
        .catch((err) => {
            return res.status(500).send({error: err.message});
        });
};

export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;

    return await Book.findById(id)
        .then(async (book) => {
            if (!book) {
                return res.status(404).send({message: 'Book not found'});
            }

            await Book.findByIdAndDelete(id);

            return res.status(200).send({message: 'Book deleted successfully'});
        })
        .catch((err) => {
            return res.status(500).send({error: err.message});
        });
};
