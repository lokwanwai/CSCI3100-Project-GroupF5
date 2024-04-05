const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');

const { mongoURI } = require('./config'); // Import the URI from the config file




function printCenteredMessage(message, totalLength = 100) {
    const paddingLength = Math.max(0, (totalLength - message.length - 2) / 2); // Subtract 2 for spacing
    const padding = '='.repeat(Math.floor(paddingLength));
    const paddingExtra = (message.length % 2 !== totalLength % 2) ? '=' : ''; // Adjust for odd/even lengths
    console.log(`${padding} ${message} ${padding}${paddingExtra}`);
}


// MongoDB connection
const connectDB = async () => {
    printCenteredMessage("Connecting to MongoDB Server", 100);
    console.log('MongoURI:', mongoURI);
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        printCenteredMessage("DB Connected", 100);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Initialize database collections
const initDB = async () => {
    const db = mongoose.connection.db;
    printCenteredMessage("Intiializing the Database with demo data", 100);
    console.log('Attempting to list collections...');
    try {
        const collections = await db.listCollections().toArray();
        console.log('Collections listed:', collections.map(c => c.name));

        // Drop existing collections
        for (let collection of collections) {
            console.log(`Dropping collection: ${collection.name}`);
            await db.dropCollection(collection.name);
            console.log(`${collection.name} dropped.`);
        }
    } catch (err) {
        console.error('Error during collection listing/dropping:', err);
        return;
    }

    // Path to the data folder
    const dataFolderPath = path.join(__dirname, '..', '..', 'data');
    const modelPath = path.join(__dirname, '..', '..', 'models');

    console.log('Reading data folder...');
    const files = fs.readdirSync(dataFolderPath);
    for (let file of files) {
        const collectionName = file.split('.')[0]; // Assuming file name format is `CollectionName.csv`
        console.log(`Processing file: ${file}, for collection: ${collectionName}`);

        const modelFile = `${collectionName}.js`;

        if (fs.existsSync(path.join(modelPath, modelFile))) {
            console.log(`Loading model for: ${collectionName}`);
            const Model = require(path.join(modelPath, modelFile));
            const csvFilePath = path.join(dataFolderPath, file);

            console.log(`Converting CSV to JSON for: ${csvFilePath}`);
            const jsonArray = await csvtojson().fromFile(csvFilePath);

            console.log(`Inserting data for collection: ${collectionName}`);
            await Model.create(jsonArray);
            console.log(`Data inserted for collection: ${collectionName}`);
        } else {
            console.log(`Model file not found for: ${collectionName}, expected at: ${path.join(modelPath, modelFile)}`);
        }
    }
    printCenteredMessage("Initialization Completed", 100);
};

module.exports = { connectDB, initDB };
