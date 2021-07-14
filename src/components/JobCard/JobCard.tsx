import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './JobCard.module.css';

function Cards({
    postedDate, estimatedSalary, skillsets, company, description, location, jobTitle
}) {
    return (
        <Card className={styles.jobCard}>
            <Card.Body>
                <Card.Title>
                    <div className={styles.jobTitle}>{company}</div>
                    <div className={styles.jobSubTitle}>{jobTitle}</div>
                </Card.Title>
                <Card.Text>
                    <div className={styles.jobLocation}><strong>Location</strong>: {location}</div>
                    <div className={styles.jobSkill}>
                        <strong>Skills:  </strong>
                        {skillsets?.join(', ')}
                    </div>
                    <div className={styles.jobFooterContainer}>
                        <p className={styles.jobLocation}><strong>Salary</strong>: {estimatedSalary}</p>
                    </div>
                </Card.Text>
                <Card.Link href="#" className={styles.applyBtn}>Apply Now</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Cards;