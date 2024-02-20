import { useParams } from "react-router-dom";
import HomeMainNav from "../components/HomeMainNav.jsx";

export function HomePage() {
  return  <>
    <HomeMainNav />
    <div className="row g-0 body-container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="./story/2" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </>
}