import React,{useState, useEffect} from 'react';
import axios from 'axios'
//import { Navigate, useNavigate } from 'react-router-dom';
import {Alert}from 'react-bootstrap'

export default function Update()
{   const [productId, setProductId] = useState("")
    const [productName, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity]= useState("")
    const [price, setPrice] = useState("")
    //const navigate = useNavigate("")

    const [productNameErr, setProductNameError] = useState(false)
    const [descriptionErr, setDescriptionError] = useState(false)
    const [priceErr, setPriceError] = useState(false)
    const [bValue, setBValue] = useState(true)
    const [status,setStatus]=useState("")


    const handleUpdate=(e)=>
    {
       
          axios.put('http://192.168.190.128:8080/api/v1/productStore/update/' + productId,
          {
            productName: productName,
            description: description,
            quantity: quantity,
            price: price
              
          }    ).then(res =>{
            setStatus(res.data)
           })
           e.preventDefault();
       
    }

    useEffect(() => {
        setProductId(localStorage.getItem("productId"))
        setProductName(localStorage.getItem("productName"))
        setDescription(localStorage.getItem("description"))
        setPrice(localStorage.getItem("price"))
        setQuantity(localStorage.getItem("quantity"))

    }, [])

    function handleProductName(e)
    {
        let pname= e.target.value;
        setProductName(pname);
        if( !(pname) || !(pname.match(/^[a-zA-Z ]*$/)))
        {
            setProductNameError(true);
            setBValue(true);
        }
        else
        {
            setProductNameError(false);
            setBValue(false);
        }
    }

    function handleDescription(e)
    {
        let descript = e.target.value;
        setDescription(descript);
        if( !(descript) || !(descript.match(/^[a-zA-Z ]*$/)))
        {
            setDescriptionError(true);
            setBValue(true);
        }
        else
        {
            setDescriptionError(false);
            setBValue(false);
        }
    }

    function handlePrice(e)
    {
        let price= e.target.value;
        setPrice(price);
        if( !(price) || !(price.match(/^[0-9]*$/)))
        {
            setPriceError(true);
            setBValue(true);
        }
        else
        {
            setPriceError(false);
            setBValue(false);
        }
    }

    return(
       <>
       
          <div class="title">
                               <div className='a'>           
                            <h1 className='hi' >Em Product Store</h1>

                            </div>
                            </div>


                            <div className=''>
           <a href="/home"><button type="submit" class="btn btn-primary">Go Back</button></a>



<div class="cw">
{status.length > 0 && (<Alert variant='success'>{status}</Alert>)}
<div class="card1">
<nav class="navbar  ">
    <div className='c'>
    <h3 style={{color: 'black'}}>Update Product Details</h3>
    </div>
    </nav><br/><center>
    <div class="txt">
    <form onSubmit={handleUpdate}>
            <label class="form-title"><b>Product Name: </b></label>
            <input class="form-control" placeholder = "Product Name" value={productName}  onChange={handleProductName}  />
            {productNameErr?<span>*Product Name must contain alphabet characters only</span>:""}
            <br />
            <label class="form-title"><b>Product Description: </b></label>
            <input class="form-control" placeholder = "Product Description" value={description}  onChange={handleDescription}  />
            {descriptionErr?<span>*Product Description must contain alphabet characters only</span>:""}
            <br />

            <label class="form-title"><b>Price: </b></label>
            <input class="form-control" placeholder = "Price" value={price} onChange={handlePrice} /><br/>
            {priceErr?<span>*Price must contain positive numbers only</span>:""}
            <br />
            <center>
            <button  class="btn btn-primary" disabled={bValue}>Update</button>
            </center>
            </form>

            </div></center>

           </div>
           </div>     
           </div>


           </>
           
           )
    
}
