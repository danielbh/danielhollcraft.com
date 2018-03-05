import React from 'react'

export default () => (
  <section>
    <div className="container">
      <header className="major">
        <h2>Contact</h2>
      </header>
      <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer non. Adipiscing cubilia elementum integer. Integer eu ante ornare amet commetus.</p>
      <form method="post" action="#">
        <div className="row uniform">
          <div className="6u 12u(xsmall)"><input type="text" name="name" id="name" placeholder="Name" /></div>
          <div className="6u 12u(xsmall)"><input type="email" name="email" id="email" placeholder="Email" /></div>
        </div>
        <div className="row uniform">
          <div className="12u"><input type="text" name="subject" id="subject" placeholder="Subject" /></div>
        </div>
        <div className="row uniform">
          <div className="12u"><textarea name="message" id="message" placeholder="Message" rows="6"></textarea></div>
        </div>
        <div className="row uniform">
          <div className="12u">
            <ul className="actions">
              <li><input type="submit" className="special" value="Send Message" /></li>
              <li><input type="reset" value="Reset Form" /></li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </section>
)
