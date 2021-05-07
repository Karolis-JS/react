import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Recipes() {

    const [allRecipe, setAllRecipe] = useState([])
    const [del, setDel] = useState(false)
    const [id, setId] = useState(0)

    let history = useHistory();


    function goToRecipes(id){
        history.push("/recipe/" +id);
    }

    useEffect(() => {
        fetch('http://localhost:8080/allrecipes')
            .then(res => res.json())
            .then(data => {
                setAllRecipe(data)
            })
    }, [])

    function deleteRecipe(){
        setDel(false)
        fetch('http://localhost:8080/deleterecipes/'+id)
            .then(res => res.json())
            .then(data => {
                setAllRecipe(data)
            })
    }

    function changeStatus (id){
        setDel(true)
        setId(id)
    }

    return (
        <div className="d-flex mt-15 just-center wrap p-15 h-auto mb-20">
            <div className={del ? "flex" : "none"}>
                <span>Are you sure?</span>
                 <i onClick={() => deleteRecipe()} className="far fa-check-circle yes"></i>
                 <i onClick={() => setDel(false)} className="far fa-times-circle no"></i>
            </div>
            {allRecipe.map((item, index) =>
            <div className="recipeCard" key={item._id}>
                <img onClick={() => changeStatus(item._id)} className='trash' src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" alt=""/>
                <h3>{item.title}</h3>
                <div className="recipeCardImg" style={{backgroundImage: `url(${item.images})`}}></div>
                <button onClick={() => goToRecipes(item._id)} className="moreBtn">More about recipe</button>
            </div>
                )}
        </div>
    );
}

export default Recipes;