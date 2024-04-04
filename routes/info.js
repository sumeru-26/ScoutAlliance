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
        console.error(error);
    }
    
}

Handlebars.registerHelper('isqm', function (value) {
    return value.comp_level == 'qm';
});
Handlebars.registerHelper('teamkey', function (value) {
    return value.substring(3);
});

infoRoute.get('/schedule', (req, res) => {
    getSchedule(2374, "2024orwil").then(
        (schedule) => {
            schedule.forEach(match => {
                console.log(`${match.comp_level}: ${match.comp_level == 'qm'}`)
            });
            res.render('schedule/index', {schedule: schedule});
        }
    );
    
})

export default infoRoute;