import { useState} from 'react'
import { useNavigate } from 'react-router-dom'


function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async()=>{
        const payload = { name, email, password, gender, age }
        try {
            const res = await fetch("https://fullstack-project-1-lohg.onrender.com/user/register",{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(payload)
            })
            const data = await res.json();
            console.log(data.msg);
            alert(data.msg);
            navigate('/login');
        } catch (error) {
            alert("Something went wrong, please try again later.");
            console.error("Error during registration:", error);
        }
    }

  return (
    <div>
        <h1>Register</h1>
       
       <input type="text" placeholder='Enter name'  value={name} onChange={(e) => setName(e.target.value)} required/>
       <input type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
       <input type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
       <input type="text" placeholder='Enter gender' value={gender} onChange={(e)=> setGender(e.target.value)} required/>
       <input type="number" placeholder='Enter age' value={age} onChange={(e)=> setAge(e.target.value)} required/>
       <button onClick={handleSubmit}>Register</button>

    </div>
  )
}

export default Register