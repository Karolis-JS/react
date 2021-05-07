import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


function FavoriteRecipes() {

    const [favorite, setFavorite] = useState([])


    let history = useHistory();


    useEffect(() => {
        fetch('http://localhost:8080/allfavorites')
            .then(res => res.json())
            .then(data => {
                setFavorite(data)
            })
    }, [])

    function goToRecipes(id){
        history.push("/recipe/" +id);
    }

    return (
        <div className="d-flex mt-15 just-center wrap p-15 h-auto">
            {favorite.map((item, index) =>
                <div className="recipeCard" key={item._id}>
                    <h3>{item.title}</h3>
                    <div className="recipeCardImg" style={{backgroundImage: `url(${item.images})`}}></div>
                    <button onClick={() => goToRecipes(item._id)} className="moreBtn">More about recipe</button>
                </div>
            )}
        </div>
    );
}

export default FavoriteRecipes;