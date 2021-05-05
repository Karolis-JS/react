import { useState, useEffect } from 'react';

function Recipes() {

    const [allRecipe, setAllRecipe] = useState([])

    function goToRecipes(id){
        console.log(id)
        window.location='http://localhost:3000/recipe/'+id;

    }


    useEffect(() => {
        fetch('http://localhost:8080/allrecipes')
            .then(res => res.json())
            .then(data => {
                setAllRecipe(data)
            })
    }, [])

    return (
        <div className="d-flex mt-15 just-center wrap p-15">
            {allRecipe.map((item, index) =>
            <div className="recipeCard" key={item._id}>
                <h1>{item.title}</h1>
                <img src={item.images} alt=""/>
                <button onClick={() => goToRecipes(item._id)} className="moreBtn">More about recipe</button>
            </div>
                )}
        </div>
    );
}

export default Recipes;