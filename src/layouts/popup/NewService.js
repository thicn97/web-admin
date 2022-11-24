import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { Fragment, forwardRef, useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from '../../components/Iconify';
import { addService, getCategories } from '../../store/actions';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewService() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { categories } = useSelector((store) => store.serviceReducer);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndClose = () => {
    handleSubmit();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      duration: '',
      price: 0,
      description: '',
      commission: 0,
      categoryId: 0,
    },
    onSubmit: (values) => {
      dispatch(addService(values));
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        Thêm dịch vụ
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Iconify icon="eva:close-fill" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thêm mới dịch vụ
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveAndClose}>
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <Stack direction="column" px={24} py={8} mb={2} spacing={4}>
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
          <TextField
            id="description"
            name="description"
            label="Thông tin thêm"
            value={values.description}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
          />
        </Stack>
      </Dialog>
    </div>
  );
}
