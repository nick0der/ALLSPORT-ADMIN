import { Link, useLocation } from "react-router-dom";
import "./newProduct.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requests";
import { addProduct } from "../../redux/apis";

export default function Product() {
  const [productNew, setProductNew] = useState([]);
  const [color, setColor] = useState([]);
  const [img, setImg] = useState([]);
  const [alt, setAlt] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    addProduct(productNew, dispatch);
    window.alert("Товар додано у базу.");
  };

  const handleChange = (e) => {
    const index = productNew.color.findIndex(item => {
      return item === e.target.value;
    });

    document.getElementById("prColor").value = e.target.value;
    document.getElementById("prImg").value = productNew.img[index];
    document.getElementById("prAlt").value = productNew.alt[index];
    document.getElementById("imgId").setAttribute("src", productNew.img[index]);

  };

  const handleName = (e) => {
    productNew.title = e.target.value;
    console.log(productNew);
  };

  const handleDesc = (e) => {
    productNew.desc = e.target.value;
    console.log(productNew);
  };

  const handlePrice = (e) => {
    productNew.price = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
    console.log(productNew);
  };

  const handleCategories = (e) => {
    var string = e.target.value.replace(/\s/g, '');
    productNew.categories = string.split(',');
    console.log(productNew);
  };

  const handleAddNewColor = (e) => {
    e.preventDefault();

    var found = false;
    for (var i = 0; i < document.getElementById("idColor").length; ++i){
      if (document.getElementById("idColor").options[i].value == color){
        found = true;
        break;
      }
    }

    if (found === false) {
      productNew.color.push(color);
      productNew.img.push(img);
      productNew.alt.push(alt);
      document.getElementById("idColor").add(new Option(color));
      document.getElementById('idColor').value=color;
      document.getElementById("imgId").setAttribute("src", img);
    } else {
      alert("Color is already in the list");
    }

    console.log(productNew);
  };

  const handleRemoveNewColor = (e) => {
    e.preventDefault();

    const index = productNew.color.findIndex(item => {
      return item === document.getElementById("idColor").value;
    });

    document.getElementById("idColor").remove(index);
    productNew.color.splice(index, 1);
    productNew.img.splice(index, 1);
    productNew.alt.splice(index, 1);

    const index2 = productNew.color.findIndex(item => {
      return item === document.getElementById("idColor").value;
    });

    document.getElementById("imgId").setAttribute("src", productNew.img[index2] ? productNew.img[index2] : "");
    document.getElementById("prColor").value = productNew.color[index2] ? productNew.color[index2] : "";
    document.getElementById("prImg").value = productNew.img[index2] ? productNew.img[index2] : "";
    document.getElementById("prAlt").value = productNew.alt[index2] ? productNew.alt[index2] : "";

  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleImg = (e) => {
    document.getElementById("imgId").setAttribute("src", e.target.value);
    setImg(e.target.value)
  };

  const handleAlt = (e) => {
    setAlt(e.target.value);
  };

  useEffect(() => {
    setProductNew({
      title: "",
      desc: "",
      img: [],
      alt: [],
      color: [],
      price: 0,
      categories: []
    });
  }, []);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Товар</h1>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Назва товару</label>
            <input id="prName" type="text" onChange={handleName} />
            <label>Опис товару</label>
            <textarea id="prDescription" type="text" onChange={handleDesc} style={{height: "70px", marginBottom: "10px"}}/>
            <label>Ціна</label>
            <input id="prPrice" type="number" onChange={handlePrice}/>
            <label>Категорії</label>
            <input id="prCategories" type="text" onChange={handleCategories}/>
          </div>
          <div className="productFormLeft">
            <label>Колір</label>
            <input id="prColor" type="text" onChange={handleColor} />
            <label>Посилання на зображення</label>
            <input id="prImg" type="text" onChange={handleImg}/>
            <label>Опис зображення</label>
            <input id="prAlt" type="text" onChange={handleAlt}/>
            <label>Колір товару</label>
            <select name="Color" id="idColor" onChange={handleChange}>

            </select>
            <button onClick={handleAddNewColor}>Додати новий колір</button>
            <button style={{marginTop: "9px"}} onClick={handleRemoveNewColor}>Видалити поточний колір</button>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img id="imgId" alt="" className="productUploadImg" />
            </div>
            <button className="productButton" onClick={handleAdd}>Створити</button>
          </div>
        </form>
      </div>
    </div>
  );
}
