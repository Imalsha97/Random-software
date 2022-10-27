import React,{useState,useEffect} from 'react';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Container } from '@material-ui/core';
import useTable from "../../components/useTable";
 import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Button from 'react-bootstrap/Button';
//import { useNavigate,useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(1),
        width:'100%'
    },
    searchInput: {
        width: '30%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'Title', label: 'Title' },
    { id: 'Status', label: 'Status' },
    { id: 'Action', label: 'Action' }
    
]

export default function AllTodos() {
    const navigate = useNavigate();
    
    const classes = useStyles();
    const [tTitle ,setTitle] = useState("");
    const [tStatus ,setStatus] = useState("");
    
    const [todos, setTodos] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        function getTodos(){
            axios.get("http://localhost:4000/todo/")
            .then((res)=>{
                console.log(res.data);
                setTodos(res.data);
            }).catch((err)=>{
                alert(err);
            })
        }
        getTodos();
    },[])
    function sendData(e){
        e.preventDefault();
        const newTodo = {
            tTitle,tStatus:"pending"
        }
        axios.post("http://localhost:4000/todo/add",newTodo).then(() => {
            alert("todo added");
              navigate(0);
            
        }).catch((err)=>{
            alert(err);
        })
    
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(todos, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.tTitle.toLowerCase().includes(target.value))
            }
        })
    }
 
    

    
    const onDelete = id => {
       
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        axios.delete("http://localhost:4000/todo/delete/"+id);
        navigate(0);
        //setTodos(getTodos());
        
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    function UpdateTodo(id){
        
        navigate("/update/"+id);
    
    }

    return (
        <>
            <Container style={{justifyContent:"center"}}>
            <Container style={{width:"60%",padding:"20px",marginTop:"20px",border: '2px solid '}}>
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Task Title"
        onChange={(e) => {
            setTitle(e.target.value);
          }}
          
        />
      </Form.Group>

      
      <Button style={{backgroundColor:'#51087E'}} type="submit">
        Submit
      </Button>
    </Form>
    </Container>
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Todo"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                   
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item._id}>
                                    <TableCell>{item.tTitle}</TableCell>
                                    <TableCell>{item.tStatus}</TableCell>
                                    
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={()=>UpdateTodo(item._id)}
                                            >
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item._id) }
                                                })
                                            }}
                                            >
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
               
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            </Container>
        </>
    )
}
