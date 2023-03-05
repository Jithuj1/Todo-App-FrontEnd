import "./home.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 800,
  },
};

function Home() {
    const [todoList, setTodoList] = useState([])
    const [first, setfirst] = useState(true)
    const [approveModal, setApproveModal] = useState(false);
    
    
     const navigate = useNavigate();
    
    useEffect(() => {
     axios.get('http://127.0.0.1:8000/list').then((res)=>{
        setTodoList(res.data)
     })
    }, [first])
    

    const theme = createTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('http://127.0.0.1:8000/list', {
        name: data.get('firstName'),
        category: data.get('email'),
        description: data.get('password'),
    }).then((res)=>{
        console.log(res)
    })
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    setfirst(!first)
  };

  function deleteTodo (id){
    axios.delete(`http://127.0.0.1:8000/delete_list/${id}`)
    alert('deleted')
    setfirst(!first)
  }

  function updateTodo (id){
    setApproveModal(true)
  }

  return (
    <div className="main">
      <div>
      <Modal
          isOpen={approveModal}
          onRequestClose={() => setApproveModal(false)}
          style={customStyles}
        >
          
            
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "2rem",
              marginLeft: "15rem",
              marginRight: "15rem",
            }}
          >
            <Button
              variant="contained"
              component="label"
              onClick={() => setApproveModal(false)}
            >
              Close
            </Button>
            <Button
              variant="contained"
              component="label"
              // onClick={makeRoom}
            >
              Request
            </Button>
          </div>
        </Modal>
      </div>
      <div className="part1">
        <Grid container spacing={3}>

        
        {todoList.map((i)=>{
            return(
                <Grid Item>
                <div className="card">
                <div>Name :{i.name}</div>
                <div>Category :{i.category}</div>
                <div>Description :{i.description}</div>
                <div>Date :{i.date}</div>
                <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{m: 2, width: "5rem"}}
                    onClick={()=>updateTodo(i.id)}
                  >
                    Update
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ m: 2, width: "5rem" }}
                    onClick={()=>deleteTodo(i.id)}
                  >
                    Delete
                  </Button>
                </div>

                </div>
            </Grid>
            )
        })}
        </Grid>
            
      </div>
      <div className="part2">
        <h1 className="heading">Add Todo</h1>
        <div>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Category"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Description"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Todo
                  </Button>
                    {/* <Link to='admin' >Admin</Link> */}
                 <Button 
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                 onClick={()=>navigate('admin')}>admin</Button>
                  <Grid container justifyContent="flex-end">
                      
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Home;
