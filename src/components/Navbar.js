import React from 'react';

function Navbar() {
    return (

     <div className='nav'>
         <div>
             <a href="http://localhost:3000/">Home</a>
         </div>
         <div>
             <a href="http://localhost:3000/allrecipes">All Recipes</a>
             <a href="http://localhost:3000/upload">Upload Recipe</a>
         </div>

    </div>

    );
}

export default Navbar;