import React from 'react'
import "./Home.css"
import bg1 from "../../assets/bg1.webp"
import bg2 from "../../assets/bg2.webp"
import bg3 from "../../assets/bg3.webp"
import bg4 from "../../assets/bg4.webp"
import bg5 from "../../assets/bg5.webp"
import bg6 from "../../assets/bg6.webp"

const Home = () => {
    return (
        <>
            <section id='home-first'>
                <div className="home-text">
                    <h1>One & Only Resorts</h1>
                    <p>
                        Found in the most fascinating places on the planet, our exceptional one-off resorts set the stage for an extraordinary escape.
                    </p>
                </div>
            </section>
            <section id='home-2'>
                <div className="container-2">
                    <h3><span>One&Only Resorts </span> > STORIES</h3>
                    <h1 >THOSE   WHO   WANDER</h1>
                    <p>Lose yourself among ancient city laneways. Find yourself in dramatic mountain landscapes. Dive deep into the world’s most fascinating destinations as you delight in exceptional one-off moments that take your breath away.</p>
                </div>


            </section>

            <section id='home-3'>
                <div className="container-3">
                    <h1>SECRETS OF ONE&ONLY</h1>
                    <p>Discover the people and details that bring each captivating destination to life, as passionate locals unlock the secrets and stories of our captivating resorts</p>
                    <button>EXPLORE</button>
                </div>

            </section>

            <section id='home-4'>
                <div className="container-4">
                    <div className="home-cards">
                        <img src={bg1} alt="" />
                        <div className="card-text">
                            <h1>
                                BOKA BAY DELIGHTS
                            </h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt perspiciatis dicta et, ipsa aut, consequuntur ducimus iure sapiente maxime soluta voluptatum tenetur praesentium quo itaque minus impedit autem sit!
                            </p>
                            <button>EXPLORE</button>
                        </div>
                    </div>
                    <div className="home-cards">
                        <img src={bg4} alt="" />
                        <div className="card-text">
                            <h1>
                                BOKA BAY DELIGHTS
                            </h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt perspiciatis dicta et, ipsa aut, consequuntur ducimus iure sapiente maxime soluta voluptatum tenetur praesentium quo itaque minus impedit autem sit!
                            </p>
                            <button>EXPLORE</button>
                        </div>
                    </div>
                    <div className="home-cards">
                        <img src={bg3} alt="" />
                        <div className="card-text">
                            <h1>
                                BOKA BAY DELIGHTS
                            </h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt perspiciatis dicta et, ipsa aut, consequuntur ducimus iure sapiente maxime soluta voluptatum tenetur praesentium quo itaque minus impedit autem sit!
                            </p>
                            <button>EXPLORE</button>
                        </div>
                    </div>
                     <div className="home-cards">
                        <img src={bg2} alt="" />
                        <div className="card-text">
                            <h1>
                                BOKA BAY DELIGHTS
                            </h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt perspiciatis dicta et, ipsa aut, consequuntur ducimus iure sapiente maxime soluta voluptatum tenetur praesentium quo itaque minus impedit autem sit!
                            </p>
                            <button>EXPLORE</button>
                        </div>
                    </div>
                    <div className="home-cards">
                        <img src={bg5} alt="" />
                        <div className="card-text">
                            <h1>
                                BOKA BAY DELIGHTS
                            </h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt perspiciatis dicta et, ipsa aut, consequuntur ducimus iure sapiente maxime soluta voluptatum tenetur praesentium quo itaque minus impedit autem sit!
                            </p>
                            <button>EXPLORE</button>
                        </div>
                    </div>
                    <div className="home-cards">
                        <img src={bg6} alt="" />
                        <div className="card-text">
                            <h1>
                                BOKA BAY DELIGHTS
                            </h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt perspiciatis dicta et, ipsa aut, consequuntur ducimus iure sapiente maxime soluta voluptatum tenetur praesentium quo itaque minus impedit autem sit!
                            </p>
                            <button>EXPLORE</button>
                        </div>
                    </div>
                    
                </div>

            </section>
        </>
    )
}
export default Home
