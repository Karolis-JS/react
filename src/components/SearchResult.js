import {useHistory} from "react-router-dom";

function SearchResult({result, keyword}) {

    let history = useHistory();

    function goToRecipes(id){
        history.push("/recipe/" +id);
    }

    return (

        <div>
            {keyword.length >= 1 ?
                <div className="search-result-main">
                    <div className="p-20-0">
                        <h4>Search result: {result.length}</h4>
                    </div>
                    <div className='searchResult'>
                        {result.map((item, index) =>
                            <div className="search-recipeCard" key={index}>
                                <h3>{item.title}</h3>
                                <div className="recipeCardImg" style={{backgroundImage: `url(${item.images})`}}></div>
                                <button onClick={() => goToRecipes(item._id)} className="moreBtn">More about recipe</button>
                            </div>
                        )}
                    </div>
                </div>
                :
                <h4 className='d-flex align-start'>Search result: 0</h4>
            }
        </div>
    );
}

export default SearchResult;