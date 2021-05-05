import React from 'react';

function UsersReview({reviews}) {
    return (
        <div className="usersReview">
            {reviews.length > 0 ?
                <div>
                    <h1>Users Review</h1>
                    <div className="usersReviewMain">
                        {reviews[0].review.map((item, index) =>
                            <div key={index} className="userCom anim">
                                <div className="rateInfo">
                                    <h3>{item.email}</h3>
                                    <div className="reviewRate"> {item.rate} <b className="star">★</b> </div>
                                </div>
                                <p>{item.comment}</p>
                            </div>
                        )}
                    </div>

                </div>
                 : null
            }

        </div>
    );
}

export default UsersReview;