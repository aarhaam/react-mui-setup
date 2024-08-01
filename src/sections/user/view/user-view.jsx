/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Table, TableRow, TableBody, TableCell, TableHead, TextField, IconButton, TableContainer } from '@mui/material';

import { useAuthStore } from 'src/store/user-store';
import { ApiService } from 'src/service/ApiService';
import { UrlService } from 'src/service/UrlService';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [queryParams, setQueryParams] = useState({
    name: '',
    page: 1
  })
  const [totalPage, setTotalPage] = useState(1)
  const [userData, setUserData] = useState([])

  const token = useAuthStore(state => state.token)

  const apiService = new ApiService()
  const urlService = new UrlService()

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      ...queryParams
    }
  }

  const init = async() => {
    try {
      const getting = await apiService.get(urlService.endpoint.base, urlService.endpoint.path.users, header)
      setTotalPage(getting.data.data.last_page)
      setUserData(getting.data.data.data)
      console.log(getting.data.data.data)
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    init()
  }, [queryParams])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Pengguna</Typography>

        <Button variant="contained" color="primary" startIcon={<Iconify icon="eva:plus-fill" />}>
          Tambah Pengguna
        </Button>
      </Stack>

      <TextField sx={{ marginBottom: 2 }} placeholder='pencarian' variant='outlined' size='small' 
        onChange={(event) => {
          setQueryParams((prevState) => ({
            ...prevState,
            name: event.target.value
          }))
        }}
      />

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData && userData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="end" marginBottom={2} marginTop={2}>
          <Typography sx={{marginRight: 5 ,marginY: 'auto'}} fontSize="small">page : {queryParams.page} of {totalPage}</Typography>
          <Box display="flex" gap={1}>
            <IconButton size="small" onClick={() => {
              if(queryParams.page > 1){
                // setPage((prevState) => prevState - 1)
              }
            }}>
              {/* <IconArrowNarrowLeft /> */}
            </IconButton>
            <IconButton size="small" onClick={(e) => {
              // if(page < totalPage){
              //   setPage((prevState) => prevState + 1)
              // }
            }}>
              {/* <IconArrowNarrowRight /> */}
            </IconButton>
          </Box>
        </Box>
      </TableContainer>
    </Container>
  );
}
