import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography, CircularProgress, Card } from '@mui/material';
import axios from 'axios';


Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
const BarChart = ({month}) => {

  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBarChartData = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:5000/api/v8/price-ranges?month=${month}`);
        if (response.data && response.data.length > 0) {
         
            const labels = response.data.map((item) => item.range);
            const counts = response.data.map((item) => item.count);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Number of Transactions',
                        data: counts,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
            setError(null);
        } else {
            setChartData(null);
            setError('No data available for the selected month.');
        }
    } catch (err) {
        console.error('Error fetching bar chart data:', err);
        setError('Error fetching bar chart data.');
    } finally {
        setLoading(false);
    }
};


useEffect(() => {
  fetchBarChartData();
}, [month]);

console.log("ChartData:",chartData)

  return (
    <Box 
    sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        padding: 3,
    }}
>
    <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mb: 2 }} 
    >
        Transactions for {month}
    </Typography>

    {loading ? (
        <CircularProgress />
    ) : error ? (
        <Typography color="error">{error}</Typography>
    ) : chartData ? (
        <Card variant="outlined" sx={{ p: 2, width: '100%', borderRadius: 2 }}>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                        title: {
                            display: true,
                            text: 'Bar Chart of Transactions',
                            font: { size: 20 },
                        },
                    },
                }}
                height={400} 
            />
        </Card>
    ) : (
        <Typography>Loading...</Typography>
    )}
</Box>
  )
}

export default BarChart