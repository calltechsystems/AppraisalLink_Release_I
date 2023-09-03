import React from 'react'
import WhyChoose from '../common/WhyChoose'
import Header from '../common/header/DefaultHeader'

const ChooseUs = () => {
  return (
    <div>
        <Header/>
       <div className="row mt80">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Why Choose Us</h2>
                <p>We provide full service at every step.</p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <WhyChoose />
          </div>
          {/* End .row */}
    </div>
  )
}

export default ChooseUs
