import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useNavigate,useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Controls from '../../components/controls/Controls';

export const getStatus = () => ([
  { id: '1', title: 'pending' },
  { id: '2', title: 'inprogress' },
  { id: '3', title: 'completed' }
])

export const UpdateTodo = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    //console.log(id,Title,Status,"DFTDFY");
    const [tTitle ,setTitle] = useState("");
    const [tStatus ,setStatus] = useState("");
    const [options ,setOptions] = useState([]);
    const [isEdited, setIsEdited] = useState(false);
   
    

    useEffect(() => {
        function getTodo(){
            axios.get("http://localhost:4000/todo/get/"+id).then((res)=>{
                setTitle(res.data.todo.tTitle);
                setStatus(res.data.todo.tStatus);
                //console.log(res.data.todo.tTitle,res.data.todo.tStatus,"yyyyyyyyy")
                
            }).catch((err)=>{
               // alert(err);
            })
        }
        getTodo();
     
    }, [])
    
    // handleDropdownChange = (e, data) => {
    //   e.persist();
  
    //   this.setState({ options: data.value });
    // };

    function sendData(e){
      
        e.preventDefault();
        const newTodo = {
            tTitle,tStatus
        }
        console.log(newTodo,"hhhhhhhh");
        axios.put("http://localhost:4000/todo/update/"+id,newTodo).then(() => {
           //navigate("/")
           setIsEdited(true)
        }).catch((err)=>{
            // alert(err);
        })

    }
    const handleInputChange = e => {
      setStatus(e.target.value);
      
  }


  return (
    <>
    <Container style={{width:"60%",padding:"20px",marginTop:"20px",paddingBottom:"100px",border: '2px solid '}}>
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Task Title" value={tTitle}
        onChange={(e) => {
            setTitle(e.target.value);
          }}
          
        />
      </Form.Group>

      <Controls.Select
                        name=""
                        label="Status"
                        value={tStatus}
                        onChange={handleInputChange}
                        options={getStatus()}
                        
                    />

      
      {/* <Dropdown >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item onClick={(e) => {setStatus(e)}}  href="pending">Pending</Dropdown.Item>
        <Dropdown.Item onClick={(e) => {setStatus(e)}}href="inprogress"> InProgress</Dropdown.Item>
        <Dropdown.Item onClick={(e) => {setStatus(e)}}href="completed">Completed</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
    <Container style={{margin:'20px'}}>
    <Button style={{backgroundColor:'#51087E'}} variant="primary" type="submit">
        Edit
      </Button>
      </Container>
    </Form>
    {
      isEdited && <Card style={{ width: '18rem',marginTop:"100px" }}>
      
      <Card.Body>
        <Card.Title>Congratulation</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button  onClick={()=>navigate('/')} variant="primary">Ok</Button>
      </Card.Body>
    </Card>
    }
    </Container>
   
      
    </>
  )
}
