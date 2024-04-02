// import axios to work with asynchronouus data
const axios = require('axios');

// implement function to fetchData
async function fetchData() {
    const options = {
        method: 'POST',
        url: 'https://linkedin-jobs-scraper-api.p.rapidapi.com/jobs',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '6f37437d0dmsh9e67dacf678d923p1aea4cjsnb2862bd17f40',
            'X-RapidAPI-Host': 'linkedin-jobs-scraper-api.p.rapidapi.com'
        },
        data: {
            title: 'Software Engineer',
            location: 'India',
            rows: 20
        }
    };

    // implment tryCatch block to handle asnchronous
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// export get job lists modules
module.exports.getJobLists = async (req, res) => {
    try {
        const jobs = await fetchData();
        return res.render('external_jobs_list', {
            jobs: jobs,
            user: req.user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching job data');
    }
};
