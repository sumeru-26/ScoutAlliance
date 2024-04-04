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

infoRoute.get('/schedule', (req, res) => {
    let team = "";
    let event = "";
    console.log(req.header("team") + req.header("event"));
    if (req.header) {
        try {
            team = req.header("team");
            event = req.header("event");
        } catch (error) {
            console.log(error);
        }
    }
    getSchedule(team, event).then(
        (schedule) => {
            console.log(schedule);
            if (schedule.Error) {
                res.render('schedule/blank');
            }
            else {
                console.log(schedule)
                schedule.sort(function (a, b) {
                    if (a.match_number < b.match_number)
                        return -1;
                    else if (a.match_number > b.match_number)
                        return 1;
                    return 0;
                });
                res.render('schedule/index', {schedule: schedule});
            }
        }
    );
    
})

export default infoRoute;