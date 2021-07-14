import axios from 'axios';

export const loadMoreJobs = async (companyName) => {
    try {
        const res = await axios.get(`https://www.zippia.com/autocomplete/company/?searchString=${companyName}&indexableOnly=true`)
        return { data: res.data, status: 200 }
    } catch (err) {
        return { status: err?.response?.status };
    }
};

export const getDefaultJobs = async (reuestPayloadData) => {
    try {
        const res = await axios.post('https://www.zippia.com/api/jobs/', reuestPayloadData);
        return { data: res.data, status: 200 }
    } catch(err) {
        return { status: err?.response?.status };
    }
}