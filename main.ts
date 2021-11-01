/*
   Copyright 2021 The CoDash Authors.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import * as chalk from 'chalk';
import express, { json } from 'express';
import fs from 'fs'

import * as consts from './src/consts';
import {GetData} from './src/GetData';
import log from './tools/log';

// initiate the app instance of express
const app = express();

// init the data object to hold all covid data, and run function GetData to update it each hour (*usually*)
var data: any;
(async()=>{
    data = await GetData();
    log("Data updated", true)
})()

app.get('/api/internal/data/lang', async (req, res) => {
    let lang = req.query.lang as String;
    fs.readFile(__dirname + `/data/${lang}.jsonc`, (err, data) => {
        if(err) return res.status(500).send("Internal server error. Pak is either not available or could not be found.")
        else {
            res.status(200).send(JSON.stringify(data));
        }
    })
})

app.get('/api/internal/overview', async (req, res) => {
    // search to see if data has the country code the request is asking for.
    var countrycode = decodeURIComponent((req.query.cc as string).toString());
    // if cc is null, send a 400 error response.
    if(!countrycode) {
        return res.status(400).send(`Bad request. (Query param cc [?cc=] is null)`);
    }
    // object that should be returned later
    var returnObj: any = new Object();
    
    // check if data has country code.
    let country_data: any = data[countrycode.toUpperCase()];

    (!country_data) ?? res.status(400).send(`Invalid country code ${country_data}. Please make sure that this country is supported by CoDash, and that the code is valid.`)

    // get current date in format of json
    let today = (new Date().getFullYear()) + '-' + ((new Date().getMonth()+1).toString()) + '-' + (new Date().getDate()).toString();
    // yesterday's date (for counter)
    let yesterday = (new Date().getFullYear().toString()) + '-' + ((new Date().getMonth()+1).toString()) + '-' + ((new Date().getDate() - 1)).toString();
    // two days ago (if today is not available.)
    let twodays = (new Date().getFullYear()) + '-' + ((new Date().getMonth()+1).toString()) + '-' + (new Date().getDate() - 2).toString();

    /**********************
     * HOW THIS WORKS
     * The filter method works by searching all of the data in the requested country code.
     * If the data for today isn't available, it should treat yesterday as today.
     * So, lets say that 2021-10-31 isn't available, but 2021-10-30 is.
     * The filter would then treat the two days as 2021-10-30 and 2021-10-29.
    */

    // today filter method
    let today_filter = country_data.data.filter((obj: { date: string; }) => {
        // fallback to yesterday if today isn't available.
        return obj.date == today || yesterday;
    })
    // yesterday filter method.
    let yesterday_filter = country_data.data.filter((obj: { date: string; }) => {
        // fallback to two days ago if todays data is not available.
        return (today_filter.date == today) ? obj.date == yesterday : obj.date == twodays;
    })

    // bind the case stats to the return object.
    returnObj["stats"] = {
        today: today_filter[0],
        yesterday: yesterday_filter[0]
    };
    
    // free up some memory by deleting unused objects.
    delete yesterday_filter[0], today_filter[0];

    // send the data.

    return res.status(200).send(JSON.stringify(returnObj));
})

app.listen(80, () => {
    log("Server started on port 80", true)
})