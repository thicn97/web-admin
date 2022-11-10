import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import { styled } from '@mui/material/styles';
import {
  Button,
  Typography,
  Container,
  Box,
  Stack,
  Card,
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Rating,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { getAppliedFormById } from '../store/actions';
import { toVND } from '../utils/formatNumber';

const steps = ['Đặt lịch', 'Đang thực hiện', 'Hoàn thành'];

export default function BookingDetail() {
  const { registerId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppliedFormById(registerId));
  }, [registerId]);

  const { candidate } = useSelector((store) => store.appliedReducer);

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
  return (
    <Page title="Booking">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Thông tin chi tiết đơn đăng ký {candidate?.fullName}
            </Typography>
            {/* <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                            Thông tin chi tiết khách hàng
                        </Typography> */}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Card sx={{ width: '50%', p: 2 }}>
            <CardMedia sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }}>
                <Avatar sx={{ width: 80, height: 80 }}>N</Avatar>
                <Stack>
                  <Typography variant="h5">{candidate?.fullName}</Typography>
                </Stack>
              </Stack>
            </CardMedia>
          </Card>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={2} mb={2}>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Họ và Tên"
              value={candidate?.fullName || ''}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Ngày sinh"
              value={candidate?.dob || ''}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Stack>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Số điện thoại"
              value={candidate?.phone || ''}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Email"
              value={candidate?.email || ''}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Stack>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Địa chỉ"
              value={candidate?.address || ''}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Mã căn cước công dân"
              value={candidate?.idNumber || ''}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Stack>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Dịch vụ có thể làm
            </Typography>
            <List sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}>
              {candidate?.candidateServicesResponseDTOS?.map(({ name, exp, price }) => {
                const labelId = `checkbox-list-label-${name}`;

                return (
                  <ListItem key={name} disablePadding>
                    <ListItemButton role={undefined} onClick={handleToggle(name)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(name) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${name} - ${toVND(price)}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
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
          <TextField label="Ghi chú" value={candidate?.description || ''} multiline rows={4} variant="outlined" />
        </Stack>
        <Stack sx={{ width: '20%', p: 2 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/registerlist"
            startIcon={<Iconify icon="akar-icons:arrow-back-thick" />}
          >
            Trở về
          </Button>
          <Stack mb={2} />
        </Stack>
      </Container>
    </Page>
  );
}
