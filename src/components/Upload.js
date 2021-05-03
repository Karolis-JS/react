import React, { useState, useRef } from 'react'


function Upload(props) {

    const titleRef = useRef()
    const imageRef = useRef()
    const ingredientsRef = useRef()
    const quantityRef = useRef()
    const preparationRef = useRef()

    const [prod, setProd] = useState({})

    const [title, setTitle] = useState('')
    const [images, setImages] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [preparation, setPreparation] = useState([])
    const [error, setError] = useState("")

    let data = {
        title: title,
        images: images,
        ingredients: ingredients,
        preparation: preparation
    }

    function addTitle(){
        console.log(titleRef.current.value)
        setTitle([titleRef.current.value])
        titleRef.current.value = ""

    }

    function addImage(){
        console.log(imageRef.current.value)
        setImages([...images, imageRef.current.value])
        imageRef.current.value = ""

    }

    function addIngredients(){
        let ingrediantsObj = {
            value: ingredientsRef.current.value,
            quantity: quantityRef.current.value
        }
        console.log(ingredientsRef.current.value)
        setIngredients([...ingredients, ingrediantsObj] )
        ingredientsRef.current.value = ""
        quantityRef.current.value = ''

    }

    function addPreparation(){
        console.log(preparationRef.current.value)
        setPreparation([...preparation, preparationRef.current.value])
        setProd([{title, images, ingredients, preparation}])
        preparationRef.current.value = ""
        console.log(ingredients)

    }

    function addRecipie(){
        // setProd([{title, images, ingredients, preparation}])
        console.log(prod)

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    return setError(data.message)
                }
                if (!data.error) {
                    setTitle('')
                    setImages([])
                    setIngredients([])
                    setPreparation([])
                    return setError(data.message)
                }

            })
    }


    return (
        <div className='uploadMain'>

                <div className='upload'>
                    <label className="mt-15">Title</label>
                    <input ref={titleRef} type="text" placeholder='Title'/>
                    <button onClick={addTitle}>Add Title</button>

                    <label className="mt-15">Image</label>
                    <input ref={imageRef} placeholder="Image"/>
                    <button onClick={addImage}>Add Image</button>

                    <label className="mt-15">Ingredients</label>
                    <input ref={ingredientsRef} placeholder="Ingredients"/>
                    <input ref={quantityRef} placeholder="Quantity"/>
                    <button onClick={addIngredients}>Add Ingredients</button>

                    <label className="mt-15">Preparation method</label>
                    <input ref={preparationRef} placeholder="Preparation method"/>
                    <button onClick={addPreparation}>Add Preparation Step</button>

                    <button onClick={addRecipie} className="mt-15">Add Recipe</button>
                    <h3 className="error">{error}</h3>
                </div>

            <div className='previewField'>

                <h1>{title}</h1>

                <h4>Image:</h4>
                {images.map((img, index) =>
                    <img key={index} src={img} alt=""/>)}

                <ol>
                    <h4>Ingredients:</h4>
                    {ingredients.map((data, index) => <li key={index}>{data.value}, {data.quantity}</li>)}
                </ol>
                <ol>
                    <h4>Preparation:</h4>
                    {preparation.map((data, index) => <li key={index}>{data}</li>)}
                </ol>

            </div>

        </div>

    );
}

export default Upload;