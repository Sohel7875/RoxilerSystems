import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, TablePagination, Typography, Box } from '@mui/material';
import { format } from 'date-fns';


const TransactionTable = ({ transactions, page, setPage, totalRecords }) => {
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); 
  };

  const emptyRows = transactions.length < 10 ? 10 - transactions.length : 0;

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Transaction Records
      </Typography>
      <TableContainer sx={{ maxHeight: 700, overflowY: 'auto' }}>
        <Table sx={{ minWidth: 800, tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ width: '10%' }}><strong>ID</strong></TableCell>
              <TableCell sx={{ width: '20%' }}><strong>Title</strong></TableCell>
              <TableCell sx={{ width: '30%' }}><strong>Description</strong></TableCell>
              <TableCell sx={{ width: '10%' }}><strong>Price</strong></TableCell>
              <TableCell sx={{ width: '10%' }}><strong>Category</strong></TableCell>
              <TableCell sx={{ width: '10%' }}><strong>Sold</strong></TableCell>
              <TableCell sx={{ width: '20%' }}><strong>Date of Sale</strong></TableCell>
              <TableCell sx={{ width: '20%' }}><strong>Image</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {transaction.description}
                  </TableCell>
                  <TableCell>${transaction.price.toFixed(2)}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        color: transaction.sold ? 'green' : 'red',
                        fontWeight: 'bold'
                      }}
                    >
                      {transaction.sold ? 'Yes' : 'No'}
                    </Box>
                  </TableCell>
                  <TableCell>{format(new Date(transaction.dateOfSale), 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    {transaction.image ? (
                      <img 
                        src={transaction.image} 
                        alt={transaction.title} 
                        style={{ width: '100px', height: 'auto', objectFit: 'contain' }} 
                      />
                    ) : (
                      'No Image'
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}

          
            {emptyRows > 0 && (
              Array.from({ length: emptyRows }).map((_, index) => (
                <TableRow key={`empty-${index}`} sx={{ height: 53 }}> 
                  <TableCell colSpan={8} />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalRecords} 
        page={page - 1} 
        onPageChange={handleChangePage}
        rowsPerPage={10} 
        labelRowsPerPage="" 
        rowsPerPageOptions={[]} 
      />
    </Paper>
  );
};

export default TransactionTable;
