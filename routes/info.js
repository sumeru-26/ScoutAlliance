import express from 'express';

const infoRoute = express.Router();

async function getSchedule(team, event_key) {
    try {
        const response = await fetch(`https://www.thebluealliance.com/api/v3/team/frc${team}/event/${event_key}/matches`, {
            method: "GET",
            headers: {
                'X-TBA-Auth-Key': process.env.TBA_KEY
            }
        });
        const schedule = await response.json();
        //console.log(schedule);
        return schedule;
    }
    catch (error) {
        console.error(error);
    }
    
}

infoRoute.get('/schedule', (req, res) => {
    getSchedule(2374, "2024orwil").then(
        (schedule) => {
            res.render('schedule/index', {'schedule': JSON.stringify(schedule)});
        }
    );
    
})

export default infoRoute;