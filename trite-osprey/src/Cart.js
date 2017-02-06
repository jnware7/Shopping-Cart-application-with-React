import React from 'react'


class Cart extends React.Component {


  render() {

    return(
      <div>

        <img className='cart' src={process.env.PUBLIC_URL + `/images/cart.jpg`} style={{width: 80, height: 80}} alt="broken"/>

      </div>
    )
  }
}

export default Cart
