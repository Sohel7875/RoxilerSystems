import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, CircularProgress, Card } from '@mui/material';
import axios from 'axios';


Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPieChartData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v8/categories?month=${month}`);
            if (data && data.length > 0) {
                const labels = data.map((item) => item._id);
                const counts = data.map((item) => item.count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40',
                            ],
                            hoverBackgroundColor: [
                                '#FF6384AA',
                                '#36A2EBAA',
                                '#FFCE56AA',
                                '#4BC0C0AA',
                                '#9966FFAA',
                                '#FF9F40AA',
                            ],
                        },
                    ],
                });
                setError(null);
            } else {
                setChartData(null);
                setError('No data available for the selected month.');
            }
        } catch (err) {
            console.error('Error fetching pie chart data:', err);
            setError('Error fetching pie chart data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPieChartData();     
        return () => {
            Chart.getChart("canvas-id")?.destroy();
        };
    }, [month]);

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: '500px',  
                margin: '0 auto',     
                gap: 2,              
            }}
        >
            <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ mb: 2 }}
            >
                Category Distribution for {month}
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : chartData ? (
                <Card 
                    variant="outlined" 
                    sx={{ 
                        p: 3, 
                        width: '100%', 
                        maxWidth: '400px',
                        textAlign: 'center', 
                        height:'300px'
                    }}
                >
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'right' },
                            },
                        }}
                    />
                </Card>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Box>
    );
};

export default PieChart;
