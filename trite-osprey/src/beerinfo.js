import React from 'react';


class Beerinfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      beers : []
    }
  }

  render() {

    return (
      <div className="beerinfo">
        {image}
        {brewery}
        {beername}
        {description}
        {abu}
        {price}
        {addToCartButton}
      </div>

    )
  }
}
