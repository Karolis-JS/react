import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function SingleRecipe() {
    const { id } = useParams()

    const [recipe, setRecipe] = useState([])


    useEffect(()=>{
        fetch('http://localhost:8080/recipe/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setRecipe([data])
            })
    },[])


    return (
        <div>
            {recipe.map(item =>
            <div className='singleRecipeCard' key={item._id}>
                <div>
                    <img src={item.images[0]} alt=""/>
                </div>

                <div className='singleRecipeInfo'>
                    <h1>{item.title}</h1>
                    <div>
                        {item.ingredients.map((ing, index) =>
                        <div key={index}>{ing.value}, {ing.quantity}</div>
                        )}
                    </div>
                    <div>{item.preparation}</div>
                </div>
            </div>
            )}
        </div>
    );
}

export default SingleRecipe;