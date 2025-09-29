import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
  const navRegister = () => {
    // window.location.href = '/register'; // Redirect to the Register page
    navigate('/register'); // Use Navigate to redirect
  }
  return(<>
    <h1>Welcome to note App</h1>
     <h2>You can prcess with the registration process.</h2>
      <button onClick={navRegister}>To Register Click Me! </button>
  </>)
}

export default Home; 