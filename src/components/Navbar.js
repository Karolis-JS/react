import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Navbar({favoriteArr}) {


    return (
     <div className='nav'>
         <div>
             <Link className="link" to="/">Home</Link>
         </div>
         <div>
             <Link className="link" to="/allrecipes">Recipes</Link>
             <Link className="link" to="/favorite">Favorite Recipes ({favoriteArr.length})</Link>
             <Link className="link" to="/search">Search</Link>
             <Link className="link" to="/upload">Upload Recipe</Link>
         </div>
    </div>
    );
}

export default Navbar;