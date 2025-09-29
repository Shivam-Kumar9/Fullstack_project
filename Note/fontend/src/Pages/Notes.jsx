import React, { useEffect, useState } from "react";

function Notes() {
  const [notes, setNotes] = useState(null);

  const fetchNotes = async (token) => {
    const res = await fetch(
      "https://fullstack-project-1-lohg.onrender.com/note/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const finalNote = await res.json();
    console.log(finalNote);
    setNotes(finalNote.notes);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchNotes(token);
  }, []);

  const handleDelete = async (id) => {
      const token = localStorage.getItem("token");
      try {
            let res = await fetch(`https://fullstack-project-1-lohg.onrender.com/note/delete/${id}`,{
                method : 'DELETE',
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',}
            })
            const newList = await res.json();
            // console.log(newList);
            fetchNotes(token);
            if(newList.message){
                alert(newList.message);
            }
            else{
                alert("Note deleted successfully");
                
            }
        }
 

 catch (error) {
     console.log("Error deleting note:", error);  
     alert("Error deleting note, please try again later.");
} 
  };

  return (
    <>
      <h1>Welcome to Notes Page</h1>
      <div>
        <button onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect to the Login page
        }}>Logout</button>
      </div>
      <div>
        {notes ? (
          notes.map((note) => (
            <div key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>Status: {note.status ? "Completed" : "Pending"}</p>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </>
  );
}

export default Notes;
