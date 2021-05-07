function UploadPreview({title, images, ingredients, preparation}) {
    return (
        <div>
            <h2>{title}</h2>

            {images.map((img, index) =>
                <img key={index} src={img} alt=""/>)}
            <ol>
                {ingredients.map((data, index) => <li key={index}>{data.value}, {data.quantity}</li>)}
            </ol>
            <ol>
                {preparation.map((data, index) => <li key={index}>{data}</li>)}
            </ol>

        </div>

    );
}

export default UploadPreview;