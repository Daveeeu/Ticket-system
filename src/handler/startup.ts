import mongoose, {ConnectOptions} from 'mongoose';
import {DB_URI} from '../config';
import express, { Request, Response, NextFunction } from 'express';

export default class StartUP{
    port; // wich port to run the express server on
    app; // the express app
    url; // MongoDB connect url

    constructor(port = 80) {
        this.port = port;
        this.app = express();
        this.url = DB_URI;
        this.app.set('view-engine', 'ejs');
    }

    run() {
        this.app.listen(this.port, () => {
            console.log('Express server is running on port ' + this.port)
        })
    }
    
    mongoose() {
        mongoose.connect(this.url, function (error) {
            if (error) {
                console.log(error)
                return;
            }
            console.log('Successfully connected to MongoDB')
        });
    }

}
