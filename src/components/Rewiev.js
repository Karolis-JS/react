import {useRef, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";


function Review({addReview}) {
    const { id } = useParams()

    const emailRef = useRef()
    const rateRef = useRef()
    const commentRef = useRef()

    const [email, setEmail] = useState("")
    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState(0)
    const [error, setError] = useState([])

    function submit(){
        let review = {
            email,
            rate,
            comment,
            recipeId: id
        }
        fetch('http://localhost:8080/review', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        }).then(res => res.json())
            .then(data => {
                setError(data)
                if (!data.error){
                    emailRef.current.value = ""
                    rateRef.current.value = "0"
                    commentRef.current.value = ""
                }
            })
    }

    useEffect(() => {
        fetch('http://localhost:8080/getreview/' + id)
            .then(res => res.json())
            .then(data => {
                addReview(data)
            })
    }, [error])


    return (
            <div className="comments">
                <h1>Leave comment and rating</h1>
                <input ref={emailRef} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email"/>
                <form ref={rateRef} onClick={(e) => setRate(e.target.value)} className="rating">
                    <label>
                        <input type="radio" name="stars" value="1"/>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="2"/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="3"/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="4"/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="5"/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                </form>
                <textarea ref={commentRef} onChange={(e) => setComment(e.target.value)} name="Comment"placeholder="Leave comment"></textarea>
                <div><b className="error">{error.message}</b></div>
                <div className="addReviewBtn" onClick={submit}>Add review</div>
            </div>

    );
}

export default Review;