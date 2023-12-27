import React, { useEffect, useState } from 'react';
import api from '../../../../helpers/api';
import Card from '../../../molecules/admin/Card/Card';
import "./Overview.css";
const Overview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/admin/overview', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setStats(response.data.overviewStatistics);
                } else {
                    setError(response);
                }
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className="cards-container">
                    {stats.map(({ label, value, to }) => (
                        <div key={label} className="card-container">
                            <Card label={label} number={value} to={to} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Overview;
