import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Container,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Rating,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { NumericFormat } from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import Iconify from '../components/Iconify';
// components
import Page from '../components/Page';
import { getServiceById } from '../store/actions';
import { toVND } from '../utils/formatNumber';

// @mui

const steps = ['Đặt lịch', 'Đang thực hiện', 'Hoàn thành'];

export default function BookingDetail() {
  const dispatch = useDispatch();
  const { service } = useSelector((store) => store.serviceReducer);

  const { serviceId } = useParams();
  useEffect(() => {
    dispatch(getServiceById(serviceId));
  }, [serviceId]);

  const [checked, setChecked] = useState([0, 2]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      name: service?.name || '',
      duration: service?.duration || '',
      price: toVND(service?.price) || 0,
      description: service?.description || '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  });

  return (
    <Page title="Booking">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Thông tin chi tiết dịch vụ {service?.name}
            </Typography>
            {/* <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                            Thông tin chi tiết khách hàng
                        </Typography> */}
          </Box>
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Card sx={{ width: '50%', p: 2 }}>
                        <CardMedia sx={{ width: '100%' }}>
                            <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }}>
                                <Avatar sx={{ width: 80, height: 80 }}>N</Avatar>
                                <Stack>
                                    <Typography variant="h5">Lê Nguyễn Minh Tinh</Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                        Mã đơn: xxx568
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardMedia>
                    </Card>
                    <Card sx={{ width: '30%', p: 2 }}>
                        <CardMedia sx={{ width: '100%' }}>
                            <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }}>
                                <Avatar sx={{ width: 80, height: 80 }}>N</Avatar>
                                <Stack>
                                    <Typography variant="h5">Nhat Thi (SE62321)</Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                        Nhân viên chăm sóc
                                    </Typography>
                                    <Rating name="read-only" value={4} readOnly />
                                </Stack>
                            </Stack>
                        </CardMedia>
                    </Card>
                    <Card sx={{ width: '30%', p: 2 }}>
                        <CardMedia sx={{ width: '100%' }}>
                            <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }}>
                                <Stack>
                                    <Typography variant="h4" color="green">
                                        Tổng tiền: +400.000đ
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                        Đã bao gồm VAT và phụ phí
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardMedia>
                    </Card>
                </Stack> */}
        <Stack direction="row" justifyContent="space-between" spacing={2} mb={2}>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Tên dịch vụ"
              value={values.name}
              onChange={handleChange}
              id="name"
              name="name"
              variant="outlined"
            />
            <NumericFormat
              label="Giá"
              id="price"
              name="price"
              value={values.price}
              thousandSeparator="."
              decimalSeparator=","
              onChange={handleChange}
              customInput={TextField}
              valueIsNumericString={false}
              InputProps={{
                endAdornment: <InputAdornment position="start">VND</InputAdornment>,
              }}
            />
          </Stack>

          <Stack direction="column" spacing={4}>
            <TextField
              label="Mã dịch vụ"
              value={service?.id || ''}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Danh mục"
              value={service?.category?.name || ''}
              InputProps={{
                readOnly: false,
              }}
              variant="outlined"
            />
          </Stack>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Thời gian thuê"
              value={values.duration}
              onChange={handleChange}
              id="duration"
              name="duration"
              InputProps={{
                endAdornment: <InputAdornment position="start">phút</InputAdornment>,
              }}
              variant="outlined"
            />
          </Stack>
          {/* <Stack direction="column" spacing={4}></Stack> */}
          {/* <Box>
                        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                            Dịch vụ sử dụng
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}>
                            {[0, 1, 2, 3].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;

                                return (
                                    <ListItem key={value} disablePadding>
                                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`Dịch vụ ${value + 1} - 20k`} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box> */}
        </Stack>
        <Stack>
          <TextField label="Thông tin thêm" value={service?.description || ''} multiline rows={4} variant="outlined" />
        </Stack>
        <Stack sx={{ width: '20%', p: 2 }}>
          <Button variant="contained" onClick={handleSubmit} startIcon={<Iconify icon="fluent:save-24-filled" />}>
            Lưu
          </Button>
          <Stack mb={2} />
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/service"
            startIcon={<Iconify icon="mdi:marker-cancel" />}
            color="error"
          >
            Hủy
          </Button>
        </Stack>
      </Container>
    </Page>
  );
}
