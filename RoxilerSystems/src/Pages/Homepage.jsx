import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Select, MenuItem, Grid, Box } from '@mui/material';
import axios from 'axios';
import TransactionsTable from '../components/TransactionTable';
import StatisticsBox from '../components/StatisticsBox ';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const Homepage = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/v8/transaction`, {
      params: { search, month, page, limit: 10 }
    });
    setTransactions(data.transactions);
    setTotalRecords(data.totalRecords);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, px: 2 }}>
      <Typography variant="h4" gutterBottom>Transactions</Typography>

      <Box sx={{ mb: 3, display: 'flex' ,gap:3}}>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>
        <TextField
          label="Search Transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 300 }}
        />
      </Box>

     
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ flexGrow: 1 }}>
            <TransactionsTable
              transactions={transactions}
              page={page}
              setPage={setPage}
              totalRecords={totalRecords}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <StatisticsBox month={month} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <PieChart month={month} />
          </Box>
          <Box>
            <BarChart month={month} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;
