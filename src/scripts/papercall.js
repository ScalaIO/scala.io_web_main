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
const destinationDirectory = '../json'

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

        var submissions = JSON.parse(body);

        // filter submissions
        var filteredSubmissions = [];
        submissions.forEach(function(item) {
            var submission = {}
            submission['id'] = item.id
            submission['tags'] = item.tags

            var speaker = {}
            speaker['name'] = item.profile.name
            speaker['bio'] = item.profile.bio
            speaker['twitter'] = item.profile.twitter
            speaker['company'] = item.profile.company
            speaker['url'] = item.profile.url
            speaker['avatar'] = item.profile.avatar
            submission['profile'] = speaker

            var co_presenter_profiles = []
            item.co_presenter_profiles.forEach(function(copresenter) {
                var speaker = {}
                speaker['name'] = copresenter.name
                speaker['bio'] = copresenter.bio
                speaker['twitter'] = copresenter.twitter
                speaker['company'] = copresenter.company
                speaker['url'] = copresenter.url
                speaker['avatar'] = copresenter.avatar
                co_presenter_profiles.push(speaker)
            });
            submission['co_presenter_profiles'] = co_presenter_profiles

            var talk = {}
            talk['title'] = item.talk.title
            talk['description'] = item.talk.description
            talk['abstract'] = item.talk.abstract
            talk['audience_level'] = item.talk.audience_level
            talk['talk_format'] = item.talk.talk_format
            submission['talk'] = talk

            // add to submissions
            filteredSubmissions.push(submission)
        });

        // write filtered submissions data to destination
        var destination = destinationDirectory + '/submissions.json'
        fs.writeFile(destination, JSON.stringify(filteredSubmissions, null, 4), (writeError) => {
            if (writeError) console.log(writeErr);
            console.log("Papercall submissions successfully extracted in " + destination);
        });

        // filter speakers
        var filteredSpeakers = [];
        filteredSubmissions.forEach(function(item) {
            var talk = item.talk
            talk['tags'] = item.tags

            var filteredSpeaker = filteredSpeakers.find(s => s['name'] === item.profile.name);
            if (filteredSpeaker) {
                // speaker already added, only add talk
                filteredSpeaker['talks'].push(talk)
            } else {
                // add to speaker with talk if new
                var speaker = item.profile
                speaker['talks'] = []
                speaker['talks'].push(talk)
                filteredSpeakers.push(speaker)
            }

            item.co_presenter_profiles.forEach(function(copresenter) {
                var filteredSpeaker = filteredSpeakers.find(s => s['name'] === copresenter.name);
                if (filteredSpeaker) {
                    // speaker already added, only add talk
                    filteredSpeaker['talks'].push(talk)
                } else {
                    // add to speaker with talk if new
                    var speaker = copresenter
                    speaker['talks'] = []
                    speaker['talks'].push(talk)
                    filteredSpeakers.push(speaker)
                }
            });
        });

        // write each speaker to destination
        filteredSpeakers.forEach(function(speaker) {
            var speakerDestination = destinationDirectory + '/speakers/' + speaker.name + '.json'
            fs.writeFile(speakerDestination, JSON.stringify(speaker, null, 4), (writeError) => {
                if (writeError) console.log(writeErr);
                console.log("Papercall " + speaker.name + " speaker successfully extracted in " + speakerDestination);
            });
        });

        var filteredSpeakers = filteredSpeakers.map(function(speaker) {
            filteredSpeaker = {}
            filteredSpeaker['name'] = speaker.name;
            filteredSpeaker['avatar'] = speaker.avatar;
            return filteredSpeaker;
        });

        var speakerDestination = destinationDirectory + '/speakers.json'
        fs.writeFile(speakerDestination, JSON.stringify(filteredSpeakers, null, 4), (writeError) => {
            if (writeError) console.log(writeErr);
            console.log("Papercall speakers successfully extracted in " + speakerDestination);
        });

    });
}