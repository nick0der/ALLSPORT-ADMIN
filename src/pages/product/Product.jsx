import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requests";
import { updateProduct } from "../../redux/apis";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [productUpd, setProductUpd] = useState([]);
  const dispatch = useDispatch();
  const [totalSold, setTotalSold] = useState(0);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProduct(product._id, productUpd, dispatch);
    window.alert("Product is updated.");
  };

  const handleChange = (e) => {
    const index = product.color.findIndex(item => {
      return item === e.target.value;
    });

    document.getElementById("prColor").value = e.target.value;
    document.getElementById("prImg").value = product.img[index];
    document.getElementById("prAlt").value = product.alt[index];
    document.getElementById("imgId").setAttribute("src", product.img[index]);

  };

  const handleName = (e) => {
    var copy = JSON.parse(JSON.stringify(productUpd));
    copy.title = e.target.value;
    setProductUpd(copy);
  };

  const handleDesc = (e) => {
    var copy = JSON.parse(JSON.stringify(productUpd));
    copy.desc = e.target.value;
    setProductUpd(copy);
  };

  const handlePrice = (e) => {
    var copy = JSON.parse(JSON.stringify(productUpd));
    copy.price = parseInt(e.target.value);
    setProductUpd(copy);
  };

  const handleInStock = (e) => {
    var copy = JSON.parse(JSON.stringify(productUpd));
    copy.inStock = e.target.value === "true";
    setProductUpd(copy);
  };

  const handleCategories = (e) => {
    var copy = JSON.parse(JSON.stringify(productUpd));
    var string = e.target.value.replace(/\s/g, '');
    copy.categories = string.split(',');
    setProductUpd(copy);
  };

  const handleColor = (e) => {
    const index = product.color.findIndex(item => {
      return item === document.getElementById("idColor").value;
    });
    var copy = JSON.parse(JSON.stringify(productUpd));
    copy.color[index] = e.target.value;
    setProductUpd(copy);
  };

  const handleImg = (e) => {
    const index = product.color.findIndex(item => {
      return item === document.getElementById("idColor").value;
    });
    var copy = JSON.parse(JSON.stringify(productUpd));
    copy.img[index] = e.target.value;
    setProductUpd(copy);
  };

  const handleAlt = (e) => {
    const index = product.color.findIndex(item => {
      return item === document.getElementById("idColor").value;
    });
    var copy = JSON.parse(JSON.stringify(productUpd));
    copy.alt[index] = e.target.value;
    setProductUpd(copy);
  };

  useEffect(() => {
    const getTotalSold = async () => {
        try {
          const res = await userRequest.get(`/products/totalSold/${product._id}`);
          document.getElementById("totalSales").textContent = res.data;
        } catch (err) {console.log(err)}
    }
    getTotalSold();
    document.getElementById("inStockText").textContent = product.inStock ? "true" : "false";
    document.getElementById("prName").value = product.title;
    document.getElementById("prDescription").value = product.desc;
    document.getElementById("prPrice").value = product.price;
    document.getElementById("idStock").value = product.inStock;
    document.getElementById("prCategories").value = product.categories.join(', ');
    document.getElementById("prColor").value = product.color[0];
    document.getElementById("prImg").value = product.img[0];
    document.getElementById("prAlt").value = product.alt[0];
    document.getElementById("idColor").value = product.color[0];
    document.getElementById("imgId").setAttribute("src", product.img[0]);
    setProductUpd(JSON.parse(JSON.stringify(product)));

    const getStats = async () => {
      try {
        const res = await userRequest.get("order/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Товар</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Створити</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Аналітика продажів" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img[0]} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">продано:</span>
              <span className="productInfoValue" id="totalSales">0</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">в наявності:</span>
              <span className="productInfoValue" id="inStockText">"true"</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Назва</label>
            <input id="prName" type="text" onChange={handleName} />
            <label>Опис</label>
            <input id="prDescription" type="text" onChange={handleDesc}/>
            <label>Ціна</label>
            <input id="prPrice" type="number" onChange={handlePrice} />
            <label>В наявності</label>
            <select name="inStock" id="idStock" onChange={handleInStock}>
              <option value="true">Так</option>
              <option value="false">Ні</option>
            </select>
            <label>Категорії</label>
            <input id="prCategories" type="text" onChange={handleCategories} />
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
              {product.color.map((item, index) => (
                  <option value={item}>{item}</option>
                ))}
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img id="imgId" alt="" className="productUploadImg" />
            </div>
            <button className="productButton" onClick={handleUpdate}>Оновити</button>
          </div>
        </form>
      </div>
    </div>
  );
}
