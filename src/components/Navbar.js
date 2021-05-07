import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
     <div className='nav'>
         <div>
             <Link className="link" to="/">Home</Link>
         </div>
         <div>
             <Link className="link" to="/allrecipes">All Recipes</Link>
             <Link className="link" to="/favorite">Favorite Recipes</Link>
             <Link className="link" to="/search">Search</Link>
             <Link className="link" to="/upload">Upload Recipe</Link>
         </div>
    </div>
    );
}

export default Navbar;