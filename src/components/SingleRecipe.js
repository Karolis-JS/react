import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function SingleRecipe() {
    const { id } = useParams()

    const [recipe, setRecipe] = useState([])
    const [favoriteStatus, setStatus] = useState(false)


    useEffect(()=>{
        fetch('http://localhost:8080/recipe/' + id)
            .then(res => res.json())
            .then(data => {
                setStatus(data.status)
                setRecipe([data])
            })
    },[])


    function addFavorite(){
        setStatus(true)
        fetch('http://localhost:8080/favorite/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    function removeFavorite(){
        setStatus(false)
        fetch('http://localhost:8080/removefavorite/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <div>
            {
             !favoriteStatus ?
             <img onClick={addFavorite} className="addToFavorite" src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/256/add-to-favorites-icon.png" alt=""/> :
             <img onClick={removeFavorite} className="addToFavorite" src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/256/remove-from-favorites-icon.png" alt=""/>
            }
            {recipe.map(item =>
            <div className='singleRecipeCard mt-20' key={item._id}>
                <div className="w-70">
                    <img src={item.images[0]} alt=""/>
                </div>

                <div className='singleRecipeInfo'>
                    <h1>{item.title}</h1>
                    <div className="d-flex text-left w-100">
                        <div className="mr-15 w-40">
                            <h4>Ingredients:</h4>
                            <ol>
                            {item.ingredients.map((ing, index) =>
                                <li key={index}>{ing.value}, {ing.quantity}</li>
                            )}
                            </ol>
                        </div>
                        <div className="w-60">
                            <h4>Preparation:</h4>
                            <div>{item.preparation}</div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default SingleRecipe;