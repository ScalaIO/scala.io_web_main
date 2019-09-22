/*
* usage:
*   from 'scripts' directory
*   npm install request yargs fs
*   node papercall.js fetch-submissions.js  --token <papercall token>
*/

const request = require('request');
const yargs = require('yargs');
const fs = require("fs");

const papercallUrl = 'https://www.papercall.io/api/v1/submissions';
const destination = '../json/submissions.json'

yargs.command('fetch-submissions', 'Fetch all submissions, filtering fields', (parameters) => {
        parameters.positional('token', {
            describe: 'The papercall api token',
            alias: 't'
        })
    }, (argv) => {
        fetchSubmissions(argv.token)
    }).demandOption(['t'])
    .help()
    .alias('help', 'h')
    .argv;

function fetchSubmissions(token) {
    var parameters = {
        state: 'accepted',
        per_page: '100',
        _token: token
    };

    // fetch submissions
    console.log("Fetching Papercall submissions...")
    request({
        url: papercallUrl,
        qs: parameters
    }, function(fetchError, response, body) {
        if (fetchError) {
            console.log(fetchError);
            return;
        }

        if (!body) {
            console.log("Could not fetch any data, invalid/unprivileged token ?");
            return;
        }

        // filter data
        var jsonData = JSON.parse(body);
        var filteredData = jsonData.map(function(item) {
            // remove unwanted fields
            delete item.state;
            delete item.confirmed;
            delete item.created_at;
            delete item.updated_at;
            delete item.additional_info;
            delete item.rating;
            delete item.trust;
            delete item.profile.shirt_size;
            delete item.profile.email;
            delete item.profile.location;
            delete item.talk.notes;
            delete item.cfp_additional_question_answers;
            item.co_presenter_profiles = item.co_presenter_profiles.map(function(copresenter) {
                delete copresenter.shirt_size;
                delete copresenter.email;
                delete copresenter.location;
                return copresenter;
            });
            return item;
        });

        // write filtered data to destination
        fs.writeFile(destination, JSON.stringify(filteredData, null, 4), (writeError) => {
            if (writeError) console.log(writeErr);
            console.log("Papercall submissions successfully extracted in " + destination);
        });
    });
}