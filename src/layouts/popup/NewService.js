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
  Box
} from '@mui/material';
import { useFormik } from 'formik';
import React, { Fragment, forwardRef, useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import {  Upload } from 'antd';
import LinearProgress from '@mui/material/LinearProgress';
import { ref , getDownloadURL, uploadBytesResumable} from "firebase/storage"
import { firebase } from '../../firebase/firebase';
import styles from '../../customcss/custom.css'
import Iconify from '../../components/Iconify';
import { addService, getCategories } from '../../store/actions';

let imageUrl= "";
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewService() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [progressPercent, setProgresspercent] = useState(0);
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
      url: '',
    },
    onSubmit: (values) => {
      values.url = imageUrl;
      
      dispatch(addService(values));
    },
    enableReinitialize: true,
  });

  const [fileList, updateFileList] = useState([]);
  
  const uploadFile = (file) => {
    if (file !== undefined) {
      
      const storageRef = ref(firebase, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageUrl= downloadURL;
          setProgresspercent(0);
        });
      }
    );     
    }
  }
  function checkJpeg(file) {
    return (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
      && (file.size / 1024 / 1024 < 2)
  }
  const normFile = (e) => {
    return e.fileList.filter(checkJpeg);
  };
  const propss = {
    fileList,

    listType: "picture-card",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      updateFileList(newFileList);
    },

    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpgOrPng || !isLt2M) {

        if (!isJpgOrPng) { console.log('Vui l??ng t???i l??n ???nh !', '', 'error'); }
        if (!isLt2M) console.log('???nh ph???i nh??? h??n 2MB!', '', 'error');

      } else uploadFile(file)
      return false;
      
    },

    onChange: (info) => {
      const temp = info.fileList.filter(checkJpeg);
      updateFileList(temp);
      info.fileList = temp;
      console.log("infor ", temp);
    },

  };
  return (
    <div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        Th??m d???ch v???
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Iconify icon="eva:close-fill" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Th??m m???i d???ch v???
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveAndClose}>
              L??u
            </Button>
          </Toolbar>
        </AppBar>
        <Stack direction="column" px={24} py={8} mb={2} spacing={4}>
          <TextField
            label="T??n d???ch v???"
            value={values.name}
            onChange={handleChange}
            id="name"
            name="name"
            variant="outlined"
          />
          <NumericFormat
            label="Gi??"
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
            label="Danh m???c"
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
            label="Th???i gian thu??"
            value={values.duration}
            onChange={handleChange}
            id="duration"
            name="duration"
            InputProps={{
              endAdornment: <InputAdornment position="start">ph??t</InputAdornment>,
            }}
            variant="outlined"
          />
          <TextField
            label="Chi???t kh???u"
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
            label="Th??ng tin th??m"
            value={values.description}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
          />
          <Box
         
            >
              <Typography variant="subtitle1" gutterBottom style={styles}>
              ???nh d???ch v???
      </Typography>
              <div style={styles}> 
              <Upload
              {...propss}
              defaultFileList ={[{uid: '0',name: `${values?.name}.png`, status: 'done', url: values?.url}]}
              accept="image/*"
            >
           {fileList.length < 1 && '+ Upload' }
            </Upload>
            {progressPercent !== 0 ? <LinearProgress color="success" value={progressPercent}/> : null}</div>
            </Box>
        </Stack>
      </Dialog>
    </div>
  );
}
