
import React from 'react'

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handlelogin = async()=>{
        const payload = { email , password}
        try {
          const res = await fetch(`https://fullstack-project-1-lohg.onrender.com/user/login`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(payload)
            })
            
            const data = await res.json()
            // console.log(data.accesstoken);
            if(data.accesstoken){
                localStorage.setItem('token', data.accesstoken)
                alert(`${data.message}`)
                window.location.href = "/notes"; // Redirect to the Notes page
            }
            else{
                alert(data.msg)
            }
        } catch (error) {
            alert(`some thing went wrong ${error}`)
        }
    }
  return (
    <>
    <div>welcome to Login</div>
    <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} required />
    <input type="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)} required /> 
     <button onClick={handlelogin}>Login</button>
    </> )
}

export default Login