import React, { useState, useRef } from 'react'
import UploadPreview from "./UploadPreview";

function Upload() {

    const titleRef = useRef()
    const imageRef = useRef()
    const ingredientsRef = useRef()
    const quantityRef = useRef()
    const preparationRef = useRef()


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

    function addImage(){
        setImages([...images, imageRef.current.value])
        imageRef.current.value = ""
    }

    function addIngredients(){
        let ingrediantsObj = {
            value: ingredientsRef.current.value,
            quantity: quantityRef.current.value
        }
        setIngredients([...ingredients, ingrediantsObj] )
        ingredientsRef.current.value = ""
        quantityRef.current.value = ''
    }

    function addPreparation(){
        setPreparation([...preparation, preparationRef.current.value])
        preparationRef.current.value = ""
    }

    function addRecipe(){
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    return setError(data.message)
                }
                if (!data.error) {
                    setTitle('')
                    titleRef.current.value = ""
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
                    <input ref={titleRef} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter tittle'/>

                    <label className="mt-15">Image</label>
                    <input ref={imageRef} placeholder="Enter image url"/>
                    <button onClick={addImage}>Add Image</button>

                    <label className="mt-15">Ingredients</label>
                    <div className="ingredientsDiv">
                        <input ref={ingredientsRef} placeholder="Enter ingredient"/>
                        <input ref={quantityRef} placeholder="Enter ingredient quantity"/>
                    </div>

                    <button onClick={addIngredients}>Add Ingredients</button>

                    <label className="mt-15">Preparation method</label>
                    <input ref={preparationRef} placeholder="Enter preparation step"/>
                    <button onClick={addPreparation}>Add Preparation Step</button>

                    <button onClick={addRecipe} id="addRecipe">Add Recipe</button>
                    <h3 className="error">{error}</h3>
                </div>

            <div className='previewField mt-4'>Preview window
                <UploadPreview
                    title={title}
                    images={images}
                    ingredients={ingredients}
                    preparation={preparation}
                />
            </div>

        </div>

    );
}

export default Upload;