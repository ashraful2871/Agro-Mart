// import "./Logos.css";
import Marquee from "react-fast-marquee";


const Logos = () => {
    return (
        <div class="marquee-container">
          <div class="marquee-content ">
          <Marquee>
            <div><img src="https://i.ibb.co.com/fYTFvRjF/food.png" alt="" className="h-40"/></div>
            <div><img src="https://i.ibb.co.com/mrRcyD0G/fruit.png" alt="" className="h-40"/></div>
            <div><img src="https://i.ibb.co.com/FkP2QZh8/landscape.png" alt="" className="h-40"/></div>
            <div><img src="https://i.ibb.co.com/5xW7ptr5/food-1.png" alt="" className="h-40"/></div>
            <div><img src="https://i.ibb.co.com/p6cCgRdC/silhouette.png" alt="" className="h-40"/></div>
            <div><img src="https://i.ibb.co.com/Ng8TCgLd/silhouette-1.png" alt="" className="h-40"/></div>
            <div><img src="https://i.ibb.co.com/RG1YFRpT/technology.png" alt="" className="h-40"/></div>
          </Marquee>
          </div>
        </div>
    );
};

export default Logos;