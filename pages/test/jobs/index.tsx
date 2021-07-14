import React, { FunctionComponent, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import { Joboptions } from 'src/constant';
import Card from '@components/JobCard';
import { getDefaultJobs, loadMoreJobs } from '@services/jobService';

const Test: FunctionComponent = () => {
    const [jobList, setJobList] = useState([]);
    const [companyNameID, setCompanyNameID] = useState(null);
    const [postingDateRange, setPostingDateRange] = useState({ value: '1d', label: 'Yesterday' });
    const [selectedValue, setSelectedValue] = useState(null);
    const [loading, setloading] = useState(true);

    // It will call and get data from zippia api.
    useEffect(() => {
        getJobList();
    }, [companyNameID, postingDateRange]);

    const getJobList = async () => {
        var reuestPayloadData = {
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "",
            "companyID": companyNameID,
            "locations": [],
            "postingDateRange": postingDateRange,
            "numJobs": 20,
            "previousListingHashes": []
        };
        setloading(true);
        const response = await getDefaultJobs(reuestPayloadData);
        if (response.status === 200) {
            setJobList(response.data?.jobs);
        }
        setloading(false);
    }

    // It's handler for change value.
    const handleChange = (value) => {
        setSelectedValue(value);
        setCompanyNameID(value?.companyID);
    }

    // It will call whenever search company by name.
    const loadJobs = async (companyName) => {
        const response = await loadMoreJobs(companyName);
        if (response.status === 200) {
            return response.data;
        }
        return [];
    };

    return (
        <React.Fragment>
            <div className="header-wrapper">
                <h2 className="header-wrapper-title">Zippia: Get the job you really want</h2>
            </div>
            <Container>
                <div className="body">
                    <div className="filter">
                        <AsyncSelect
                            className="filter-company"
                            cacheOptions
                            defaultOptions
                            noOptionsMessage={() => 'Loading...'}
                            placeholder="Search jobs by company name"
                            isClearable={true}
                            value={selectedValue}
                            getOptionLabel={e => e.companyName}
                            getOptionValue={e => e.companyID}
                            loadOptions={loadJobs}
                            onChange={handleChange}
                        />
                        <Select
                            className="filter-type"
                            classNamePrefix="Search Latest Post Jobs"
                            isClearable={true}
                            isSearchable={true}
                            defaultValue={postingDateRange}
                            onChange={(jobPostSelectedValue) =>
                                setPostingDateRange(jobPostSelectedValue?.value)}
                            name="color"
                            options={Joboptions}
                        />
                    </div>
                </div>
                <br />
                {
                    jobList.length > 0
                        ?
                        <Row>
                            {jobList?.map((jobData, index) => (
                                <Col sm={6} md={4} lg={3} style={{ padding: '15px' }}>
                                    <Card
                                        postedDate={jobData.postedDate}
                                        estimatedSalary={jobData.estimatedSalary}
                                        skillsets={jobData.skillsets}
                                        jobTitle={jobData.jobTitle}
                                        location={jobData.location}
                                        description={jobData.shortDesc}
                                        company={jobData.companyName}
                                        key={`grid-${index}`}
                                    />
                                </Col>
                            ))}
                        </Row>
                        :
                        loading
                            ?
                            <h5 style={{ padding: '20px', textAlign: 'center' }}>
                                <Spinner animation="border" variant="primary" />
                                &nbsp; Please wait for few mintues, Loading...
                            </h5>
                            :
                            <h5 className="no-job-found">
                                Oops! jobs doesn't found for you.
                            </h5>
                }
            </Container>
        </React.Fragment>
    )
}

export default Test;
