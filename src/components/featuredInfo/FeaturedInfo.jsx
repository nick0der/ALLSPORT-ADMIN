import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requests";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("order/income");
        var list = res.data.sort((a, b) => (a._id < b._id) ? 1 : -1);
        setIncome(list);
        setPerc((list[0].total * 100) / list[1].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Минулий місяць</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[1]?.total} грн.</span>
        </div>
        <span className="featuredSub">У порівнянні з минулим місяцем</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Цей місяць</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[0]?.total} грн.</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">У порівнянні з минулим місяцем</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Усього продажей</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income.reduce((accumulator, object) => {return accumulator + object.total}, 0)} грн.</span>
        </div>
        <span className="featuredSub">Сума усіх продажей</span>
      </div>
    </div>
  );
}
