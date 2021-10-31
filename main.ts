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
import express from 'express';
import fs from 'fs'

import * as consts from './src/consts';
import {GetData} from './src/GetData';
import findCountryCode from './tools/findCountryCode';
import log from './tools/log';

// initiate the app instance of express
const app = express();

// init the data object to hold all covid data, and run function GetData to update it each hour (*usually*)
var data: any;
(async()=>{
    data = await GetData();
    log("Data updated", true)
})()

app.get('/api/internal/overview', async (req, res) => {
    // search to see if data has the country code the request is asking for.
    var countrycode = decodeURIComponent((req.query.cc).toString());
    // if cc is null, send a 400 error response.
    if(!countrycode) {
        return res.status(400).send(`Bad request. (Query param cc [?cc=] is null)`);
    }
    // object that should be returned later
    var returnObj: any = new Object();
    
    // check if data has country code.
    let country_data: any = data[countrycode.toUpperCase()];

    // get current date in format of json
    let today = (new Date().getFullYear()) + '-' + (new Date().getMonth()) + '-' + (new Date().getDay());
    // yesterday's date (for counter)
    let yesterday = (new Date().getFullYear()) + '-' + (new Date().getMonth()) + '-' + (new Date().getDay() - 1);
    // two days ago (if today is not available.)
    let twodays = (new Date().getFullYear()) + '-' + (new Date().getMonth()) + '-' + (new Date().getDay() - 2);

        // today filter method
    let today_filter = country_data.data.filter((obj: { date: string; }) => {
        // fallback to yesterday if today isn't available.
        return obj.date == today || obj.date == yesterday;
    })
    
    returnObj["case_stats"] = {
        
    }
})

app.listen(80, () => {
    log("Server started on port 80", true)
})