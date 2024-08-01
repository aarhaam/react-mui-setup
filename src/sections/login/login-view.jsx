/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable consistent-return */
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { ApiService } from 'src/service/ApiService';
import { UrlService } from 'src/service/UrlService';
import { useAuthStore } from 'src/store/user-store';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  const apiService = new ApiService()
  const urlService = new UrlService()
  const setUser = useAuthStore(state => state.setUser)
  const [isLoading, setIsLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async() => {
    try {
      setIsLoading(true)
      const sending = await apiService.post(urlService.endpoint.base, urlService.endpoint.path.login, {}, credential)
      setUser(sending.data.data, sending.data.token)
      setIsLoading(false)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      return error
    }
  };

  const [credential, setCredential] = useState({
    email: '',
    password: ''
  })

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" 
          type='email'
          onChange={(event) => {
            setCredential((prevState) => ({
              ...prevState,
              email: event.target.value
            }))
          }}
          value={credential.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            setCredential((prevState) => ({
              ...prevState,
              password: event.target.value
            }))
          }}
        />
      </Stack>


      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx={{ marginTop: 2 }}
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Sign in to Minimal</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
