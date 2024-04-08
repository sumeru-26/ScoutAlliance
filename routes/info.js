import fs from 'node:fs';

import express from 'express';
import Handlebars from 'handlebars';

const infoRoute = express.Router();

async function getSchedule(team, event_key) {
    try {
        const response = await fetch(`https://www.thebluealliance.com/api/v3/team/frc${team}/event/${event_key}/matches/simple`, {
            method: "GET",
            headers: {
                'X-TBA-Auth-Key': process.env.TBA_KEY
            }
        });
        const schedule = await response.json();
        return schedule;
    }
    catch (error) {
        console.log(error);
    }
    
}

Handlebars.registerHelper('isqm', function (value) {
    return value.comp_level == 'qm';
});
Handlebars.registerHelper('teamkey', function (value) {
    return value.substring(3);
});
Handlebars.registerHelper('isSchedule', function (value) {
    return isSchedule == true;
})


const scheduleTable = fs.readFileSync('views/schedule/partials/scheduleTable.hbs').toString();
Handlebars.registerPartial('scheduleTable', Handlebars.compile(scheduleTable));

infoRoute.get('/schedule', (req, res) => {
    let team = "2374";
    let event = "2024orwil";
    console.log(req.header("team") + req.header("event"));
    if (req.header) {
        try {
            //team = req.header("team");
            //event = req.header("event");
        } catch (error) {
            console.log(error);
        }
    }
    getSchedule(team, event).then(
        (schedule) => {
            console.log(JSON.stringify(schedule));
            let isSchedule = true;
            if (schedule.Error) {
                isSchedule = false;
            }
            else {
                //console.log(schedule)
                schedule.sort(function (a, b) {
                    if (a.match_number < b.match_number)
                        return -1;
                    else if (a.match_number > b.match_number)
                        return 1;
                    return 0;
                });
                res.render('schedule/index', {schedule: schedule, isSchedule: isSchedule});
            }
        }
    );
    
})

export default infoRoute;