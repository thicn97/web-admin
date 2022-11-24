import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Container,
  createFilterOptions,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
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
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import Iconify from '../components/Iconify';
// components
import Page from '../components/Page';
import { getCategories, getServiceById, updateService } from '../store/actions';
import { toVND } from '../utils/formatNumber';

// @mui

export default function BookingDetail() {
  const dispatch = useDispatch();
  const { service, categories } = useSelector((store) => store.serviceReducer);
  const filter = createFilterOptions();

  const { serviceId } = useParams();
  useEffect(() => {
    dispatch(getServiceById(serviceId));
    dispatch(getCategories());
  }, [serviceId]);

  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: service?.name || '',
      duration: service?.duration || '',
      price: service?.price || 0,
      description: service?.description || '',
      commission: service?.commission || '',
      categoryId: service?.category?.id || 0,
    },
    onSubmit: (values) => {
      dispatch(updateService({ id: serviceId, ...values }));
      toast.success('Cập nhật thành công');
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
          </Box>
        </Stack>
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
              valueIsNumericString
              onValueChange={(numbericValue) => setFieldValue('price', numbericValue.value)}
              customInput={TextField}
              allowNegative={false}
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
              id="categoryId"
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
              fullWidth
              label="Danh mục"
              select
              SelectProps={{ MenuProps: { MenuListProps: { style: { width: '100%' } } } }}
            >
              {categories.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>

            {/* <Autocomplete
              id="categoryId"
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    name: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              options={categories}
              getOptionLabel={(option) => {
                console.log(option);
                // Value selected with enter, right from the input
                const category = categories?.find((el) => el.id === option);
                // Add "xxx" option created dynamically
                // if (option.inputValue) {
                //   return option.inputValue;
                // }
                // Regular option
                return option ? category?.name : '';
              }}
              renderOption={(props, option) => <li {...props}>{option?.name}</li>}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => <TextField {...params} label="AC" />}
            /> */}
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
            <TextField
              label="Chiết khấu"
              value={values.commission}
              onChange={handleChange}
              id="commission"
              name="commission"
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
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
