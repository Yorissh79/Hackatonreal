import React from 'react'
import "./Home.css"
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
        </>
    )
}
export default Home
