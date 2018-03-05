import React from 'react'

export default () => (
  <section>
    <div className="container">
      <header className="major">
        <h2>Blog</h2>
      </header>
      <div className="features">
        <article>
          <a href="#" className="image"><img src={require("../assets/images/pic03.jpg")} alt="" /></a>
          <div className="inner">
            <h4>Possibly broke spacetime</h4>
            <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer adipiscing ornare amet.</p>
          </div>
        </article>
        <article>
          <a href="#" className="image"><img src={require("../assets/images/pic03.jpg")} alt="" /></a>
          <div className="inner">
            <h4>Terraformed a small moon</h4>
            <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer adipiscing ornare amet.</p>
          </div>
        </article>
        <article>
          <a href="#" className="image"><img src={require("../assets/images/pic03.jpg")} alt="" /></a>
          <div className="inner">
            <h4>Snapped dark matter in the wild</h4>
            <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer adipiscing ornare amet.</p>
          </div>
        </article>
      </div>
    </div>
  </section>
)

