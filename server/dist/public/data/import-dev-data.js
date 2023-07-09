var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../../models/productModel';
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
dotenv.config({ path: `${__dirName}/../../config.env` });
const db = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.DATABASE) === null || _b === void 0 ? void 0 : _b.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
if (!db)
    throw new Error('There has been an error while connecting your password to the database in the import script. Could not connect');
mongoose
    .connect(db)
    .then(() => console.log('Database connection is successful in the import script'))
    .catch((error) => {
    'There was an error when connecting to the database in the import script';
    console.log(error);
});
// READ JSON FILE
const products = JSON.parse(fs.readFileSync(`${__dirName}/products.json`, 'utf-8'));
// IMPORT DATA INTO DATABASE
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product.create(products);
        console.log('Data sucessfully loaded:');
    }
    catch (error) {
        console.log(error);
    }
    process.exit();
});
// DELETE DATA FROM THE DATABASE
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product.deleteMany();
        console.log('Data sucessfully deleted!');
    }
    catch (error) {
        console.log(error);
    }
    process.exit();
});
// RUN FUNCTION DEPENDING ON THE LAST ARG
if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
