import React, { useState } from 'react'
import Display from './display/Display'
import $ from "jquery";
import { Stack, Typography, Button, Fade, Modal, Box, Backdrop } from '@mui/material/'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: '0 0 10px 5px gray',
    p: 4,
};
import { Delete as DeleteIcon, Person as PersonIcon, PersonAdd as PersonAddIcon, School as SchoolIcon } from '@mui/icons-material/';
import 'bootstrap/dist/css/bootstrap.min.css';

const App2 = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [inputValues, setInputValues] = useState(["", "", "", ""])
    const valueHandle = (e, inx) => {
        setInputValues(prev => {
            prev[inx] = e.target.value
            return prev
        })
    }
    const addUser = () => {
        $.ajax({
            url: "https://for-it-center-system.000webhostapp.com/models/insert.php",
            type: "GET",
            data: {
                name: inputValues[0],
                surname: inputValues[1],
                teacher: inputValues[2],
                group: inputValues[3]
            },
            success: function (data) {
                console.log(data)
            }
        })
}
const handleClose = () => setOpen(false);
return (
    <div>
        <center>
            <Stack style={{ margin: '0 auto', display: "inline-block" }} direction="row" spacing={2}>
                <Button variant="contained" endIcon={<PersonIcon />}  >
                    O'quchilar
                </Button>
                <Button onClick={handleOpen} variant="outlined" endIcon={<PersonAddIcon />}>
                    Qo'shish
                </Button>
                <Button variant="outlined" endIcon={<SchoolIcon />} >
                    O'qituvchilar
                </Button>
            </Stack>
            <Display />
        </center>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        O'quvchi Qo'shish
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={e => { e.preventDefault(); addUser() }}>
                            <input onInput={(e) => valueHandle(e, 0)} required className="form-control mb-2" type="text" placeholder='Ismingiz' />
                            <input onInput={(e) => valueHandle(e, 1)} required className="form-control" type="text" placeholder='Familyangiz' />
                            <input onInput={(e) => valueHandle(e, 2)} required className="form-control mt-2" type="text" placeholder='Guruh' />
                            <input onInput={(e) => valueHandle(e, 3)} required className="form-control my-2" type="text" placeholder='Teacher' />
                            <button type='submit' className='btn btn-success'>Add </button>
                            <button type='clear' className='ms-2  btn btn-danger'>Clear</button>
                        </form>
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    </div>
)
}

export default App2