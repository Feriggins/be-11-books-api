import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from '../config/connection'; // Adjust the path as necessary
import { Book } from '../models'; // Adjust the path as necessary
import { IBook } from '../models/book'; // Assuming you have an IPlace interface in your place model

dotenv.config();

const seedBooks = async (): Promise<void> => {
    // Define an array of 10 place records
    const places: Array<Partial<IBook>> = [
        {
            title: "The Great Adventure",
            description: "A thrilling tale of exploration and discovery.",
            year: 2021,
            quantity: 15,
            image: "https://example.com/images/great-adventure.jpg"
        },
        {
            title: "Mystery of the Lost City",
            description: "An archaeologist uncovers secrets of an ancient civilization.",
            year: 2019,
            quantity: 8,
            image: "https://example.com/images/lost-city.jpg"
        },
        {
            title: "Galactic Wars",
            description: "A sci-fi epic about interstellar battles and alliances.",
            year: 2023,
            quantity: 25,
            image: "https://example.com/images/galactic-wars.jpg"
        },
        {
            title: "The Last Kingdom",
            description: "A historical drama set in the final days of a crumbling empire.",
            year: 2020,
            quantity: 12,
            image: "https://example.com/images/last-kingdom.jpg"
        },
        {
            title: "Into the Wild",
            description: "A survival story set in the untamed wilderness.",
            year: 2022,
            quantity: 10,
            image: "https://example.com/images/into-the-wild.jpg"
        },
        {
            title: "Ocean's Depth",
            description: "A deep dive into the mysteries of the underwater world.",
            year: 2018,
            quantity: 20,
            image: "https://example.com/images/ocean-depth.jpg"
        },
        {
            title: "Space Frontier",
            description: "An astronaut's journey to the edge of the solar system.",
            year: 2024,
            quantity: 5,
            image: "https://example.com/images/space-frontier.jpg"
        },
        {
            title: "Forbidden Forest",
            description: "A fantasy tale of magic and mythical creatures.",
            year: 2021,
            quantity: 18,
            image: "https://example.com/images/forbidden-forest.jpg"
        },
        {
            title: "The Secret Garden",
            description: "A heartwarming story about a hidden garden that changes lives.",
            year: 2017,
            quantity: 30,
            image: "https://example.com/images/secret-garden.jpg"
        },
        {
            title: "The Time Traveler",
            description: "A journey through different eras, unraveling the fabric of time.",
            year: 2023,
            quantity: 22,
            image: "https://example.com/images/time-traveler.jpg"
        }
    ];

    try {
        // Connect to the database
        await db;

        // Clear existing places
        await Book.deleteMany({});
        console.log('Existing books cleared.');

        // Insert new places
        await Book.insertMany(places);
        console.log('10 books successfully added.');

        // Disconnect from the database
        mongoose.connection.close();
    } catch (error: any) {
        console.error('Error seeding books:', error);
        mongoose.connection.close();
    }
};

// Run the seed function
seedBooks();
