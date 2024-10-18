import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v8/statistics?month=${month}`
    );

    setStatistics(data);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Statistics for {month}
      </Typography>
      <Card variant="outlined" sx={{ p: 2, maxWidth: 500, margin: 'auto' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Sale Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ${statistics.totalSaleAmount}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Sold Items
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {statistics.totalSoldItems}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Not Sold Items
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {statistics.totalNotSoldItems}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StatisticsBox;
