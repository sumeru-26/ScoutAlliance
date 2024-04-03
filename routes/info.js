import express from 'express';
import 'handlebars';

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

infoRoute.get('/schedule', (req, res) => {
    getSchedule(2374, "2024orwil").then(
        (schedule) => {
            //Handlebars.registerHelper('isQm', function (value) {
                return value.comp_level == "qm";
            })
            res.render('schedule/index', {schedule: schedule});
        }
    );
    
})

export default infoRoute;