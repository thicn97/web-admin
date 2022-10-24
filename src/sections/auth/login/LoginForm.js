import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import axios from '../../../api/axiosClient';
// ----------------------------------------------------------------------
const LOGIN_URL = '/auth';

export default function LoginForm() {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current?.focus();
  // }, [])

  // useEffect(() => {
  //   setErrMsg('');
  // }, [user, pwd])

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // const defaultValues = {
  //   email: '',
  //   password: '',
  //   remember: true,
  // };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    // defaultValues,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      localStorage.clear();
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      localStorage.setItem('data', JSON.stringify(response?.data));
      const token = response?.data?.token;
      const role = response?.data?.role;
      setUser('');
      setPwd('');
      setSuccess(true);
      onSubmit();
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current?.focus();
    }
  };

  const onSubmit = async () => {
    navigate('/dashboard/app', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Tên tài khoản" onChange={(e) => setUser(e.target.value)} />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPwd(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Nhớ mật khẩu" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
