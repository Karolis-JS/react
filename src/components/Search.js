import SearchResult from "./SearchResult";
import { useEffect, useState } from 'react';

function Search() {

    const [keywords, setKeywords] = useState([])
    const [result, setResult] = useState([])

    useEffect(() =>{
        sendKeyword()
    }, [keywords])

    function setKeyword(e) {
        if (e.key === 'Enter') {
            if (!!e.target.value) {
                if (keywords.length === 0) {
                    setKeywords([...keywords, e.target.value])
                    e.target.value = ""
                } else {
                    if (!keywords.includes(e.target.value)) {
                        setKeywords([...keywords, e.target.value])
                        e.target.value = ""
                    } else {
                        e.target.value = `${e.target.value} already used`
                    }
                }
            }
        }
    }

    function removeKeyword(index){
        let array = keywords
        array.splice(index,1);
        setKeywords([...array])
    }

    function sendKeyword(){

        fetch('http://localhost:8080/search', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(keywords)
        }).then(res => res.json())
            .then(data => {
                setResult(data)
            })
    }

    return (
        <div className="searchMain">
            <div className="searchInp-div">
                <div className="search-input-div">
                    <input className='searchInput' onKeyDown={(e) => setKeyword(e)} type="text" placeholder="Enter keyword, for example: 'vanduo'"/>
                    <i className="fas fa-search searchIcon"></i>
                </div>
                <div className="keyword-div">
                   {keywords.map((item, index) =>
                   <div className='keyword' key={index}><b>{item} <i onClick={() => removeKeyword(index)}  className="fas fa-times keyword-icon"></i></b>
                   </div>)}
                </div>
            </div>
            <div className="w-60">
                <SearchResult result={result} keyword={keywords} />
            </div>

        </div>
    );
}

export default Search;

