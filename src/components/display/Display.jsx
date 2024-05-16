import React, { useEffect, useState } from 'react'
import $ from "jquery";import { Stack, Typography, Button, Fade, Modal, Box, Backdrop } from '@mui/material/'
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


const Display = () => {
    const [display, setDisplay] = useState([])
    const [current, setCurrent] = useState({id,name,surname,guruh,teacher})
    const [inputValues, setInputValues] = useState(["", "", "", ""])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        fetch("https://for-it-center-system.000webhostapp.com/models/display.php")
            .then(data => data.json())
            .then(res => setDisplay(res))
    }, [])
    const showUser = (reqId) => {
        $.ajax({
            url: "https://for-it-center-system.000webhostapp.com/models/user.php",
            type: "GET",
            data: {
                id: reqId,
            },
            success: function (data) {
                setCurrent(data)
                handleOpen()

            }
        })
    }
    const valueHandle = (e, inx) => {
        setInputValues(prev => {
            prev[inx] = e.target.value
            return prev
        })
    }
    const update = (reqId) => {
        $.ajax({
            url: "https://for-it-center-system.000webhostapp.com/models/update.php",
            type: "GET",
            data: {
                id: reqId,
                name: inputValues[0],
                surname: inputValues[1],
                teacher: inputValues[2],
                group: inputValues[3]
            },
            success: function (data) {
                console.log(data);
            }
        })
    }
    return (
        <div className='container'>

            <table className=' table-hover  table w-75 mx-auto' >
                <thead>
                    <tr>
                        <th>№</th>
                        <th>FIO</th>
                        <th>To'lov - May</th>
                        <th>Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {display.map(({ name, id, surname, teacher }) =>
                        <tr onClick={() => showUser(id)} key={name}>
                            <td>{id}</td>
                            <td>{name + "-" + surname}</td>
                            <td><button className={`btn ${id < 9 ? 'btn-success' : 'btn-danger'}`}></button></td>
                            <td>{teacher}</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
                            <form onSubmit={e => { e.preventDefault(); update(current.id) }}>
                                <input onInput={(e) => valueHandle(e, 0)} value={current.name} required className="form-control mb-2" type="text" placeholder='Ismingiz' />
                                <input onInput={(e) => valueHandle(e, 1)} value={current.surname} required className="form-control" type="text" placeholder='Familyangiz' />
                                <input onInput={(e) => valueHandle(e, 2)} value={current.guruh} required className="form-control mt-2" type="text" placeholder='Guruh' />
                                <input onInput={(e) => valueHandle(e, 3)} value={current.teacher} required className="form-control my-2" type="text" placeholder='Teacher' />
                                <button type='submit' className='btn btn-success float-right'>Update </button>
                                <button type='clear' className='ms-2  btn btn-danger'>Clear</button>
                            </form>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Display