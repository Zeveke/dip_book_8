import React, { useState } from "react";

export function NavBar(){
  const [showDropdown, setShowDropdown] = useState(false);


  return (
       <ul style={{
              listStyleType: 'none',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
              backgroundColor: '#333',
            }}>
              <li className="dropdown" style={{ float: 'right' }}>
                <a 
                href="/admin/profileadmin"
                  className="dropbtn"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    display: 'inline-block',
                    color: 'white',
                    textAlign: 'center',
                    padding: '14px 16px',
                    textDecoration: 'none',
                  }}
                >
                  Добро пожаловать {localStorage.getItem("username")}
                </a>
              </li>
            </ul>
                
  );
};