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
import { getSitterDetail } from '../store/actions';
import { toVND } from '../utils/formatNumber';

const steps = ['Đặt lịch', 'Đang thực hiện', 'Hoàn thành'];

export default function BookingDetail() {
  const dispatch = useDispatch();
  const { sitter } = useSelector((store) => store.sitterReducer);
  const { sitterId } = useParams();
  useEffect(() => {
    dispatch(getSitterDetail(sitterId));
  }, [sitterId]);

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
              Thông tin chi tiết của {sitter?.fullName}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Thông tin chi tiết chăm sóc viên
            </Typography>
          </Box>
        </Stack>
        {/* <Stack mb={2}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={3} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          {/* <Card sx={{ width: '30%', p: 2 }}>
            <CardMedia sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }}>
                <Avatar sx={{ width: 80, height: 80 }}>N</Avatar>
                <Stack>
                  <Typography variant="h5">Nhat Thi (xxx568)</Typography>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Nguời đặt lịch hẹn
                  </Typography>
                </Stack>
              </Stack>
            </CardMedia>
          </Card> */}
          <Card sx={{ width: '50%', p: 2 }}>
            <CardMedia sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }}>
                <Avatar sx={{ width: 80, height: 80 }}>N</Avatar>
                <Stack>
                  <Typography variant="h5">Nguyễn Văn A</Typography>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Nhân viên chăm sóc
                  </Typography>
                  <Rating name="read-only" value={sitter?.ratingStar || 0} readOnly />
                </Stack>
              </Stack>
            </CardMedia>
          </Card>
          {/* <Card sx={{ width: '30%', p: 2 }}>
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
          </Card> */}
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={2} mb={2}>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Họ và Tên"
              value={sitter?.fullName}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Ngày sinh"
              value={sitter?.dob}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Bằng cấp"
              defaultValue="Trung cấp ..."
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Stack>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Mức lương trung bình"
              value={toVND(sitter?.avgPrice)}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Số điện thoại"
              value={sitter?.phone}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Email"
              value={sitter?.email}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Stack>
          <Stack direction="column" spacing={4}>
            <TextField
              label="Địa chỉ"
              value={sitter?.address}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              label="Căn cước công dân"
              value={sitter?.idNumber}
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
              {sitter?.sitterServices?.map(({ serviceName, servicePrice, exp, duration }) => {
                const labelId = `checkbox-list-label-${serviceName}`;

                return (
                  <ListItem key={serviceName} disablePadding>
                    <ListItemButton role={undefined} onClick={handleToggle(serviceName)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(serviceName) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${serviceName} - ${toVND(servicePrice)}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Stack>
        <Stack>
          <TextField
            label="Ghi chú"
            defaultValue={'Ghi chú dành cho người được chăm sóc...'}
            multiline
            rows={4}
            variant="outlined"
          />
        </Stack>
        <Stack sx={{ width: '20%', p: 2 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/sitlist"
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
