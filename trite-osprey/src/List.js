import React from 'react';
import Cart from './Cart';

class List extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      beers : [],
      currentBeer: null,
      searchString: '',
      visible: false,
      active: this.props.active || 0,
      cartPriceArray: [],
      beerList:[],
      totalPrice: 0
    }
  }

  componentWillMount() {
    this.getAllBeers()
  }

  // initial fetch to retreive stored beers from DB
  getAllBeers() {
    fetch('http://localhost:5000/beers', {
      method: 'get',
    })
    .then(response => response.json())
    .then(results => {
      this.setState({
        beers: results
      })
    })
  }

  handleChange(event) {
    this.setState( { searchString: event.target.value} )
  }

  hide() {
    this.setState({visible: false})
  }

  handleClick(event) {
    let node = Array.prototype.slice.call(event.currentTarget.children);
    let index = node.indexOf(event.target)
    this.setState({visible: true, active: index, currentBeer: this.state.beers[index] })
  }

  addToCart(event){
    let { cartPriceArray, currentBeer } = this.state,
        newCartPriceArray = cartPriceArray.push(currentBeer.price),
        totalPriceArray = cartPriceArray.reduce((a,b) => a + b),
        newBeerList = this.state.beerList.push(currentBeer.beername)

    this.setState({
      cartPriceArray: newCartPriceArray,
      totalPrice: totalPriceArray,
      beerList: newBeerList
    })
  }



  removeFromCart(event){
    this.setState({cartValue: this.state.cartValue - this.state.currentBeer.price,
    list: this.state.list - this.state.currentBeer.beername})
  }

  // componentDidMount() {
  //     console.log('beers', this.state.beers)
  //     if ( this.state.beers[0] ) {
  //        let firstBeerName = this.state.beers[0].beername
  //        console.log(firstBeerName);
  //      }
  // }

  render() {
    // const {beers} = this.props.beers

    let beers  = this.state.beers,
        searchString = this.state.searchString.trim().toLowerCase()

    if (searchString.length > 0) {
      beers = beers.filter(function(value) {
        return value.beername.toLowerCase().match( searchString ) || value.brewery.toLowerCase().match( searchString )
      })
    }

    const currentBeerDiv = this.state.currentBeer ? <div className={this.state.visible ? "popout" : "invisible"}>

      <button onClick={this.hide.bind(this)} className="closebutton">X</button>

      <div>{this.state.currentBeer.brewery}</div>

      <div className='center_section'>

          <div className='container_left'>
            <img src={process.env.PUBLIC_URL + `/images/${this.state.currentBeer.image}.jpg`} style={{width: 180, height: 225}} alt="broken" />
          </div>

          <div className='container_right'>
            <div> {this.state.currentBeer.beername} </div>
            <div>{this.state.currentBeer.category}</div>
            <div>ABU: { ' ' +this.state.currentBeer.abu}%</div>
            <div> ${this.state.currentBeer.price}.00 </div>
          </div>

      </div>

      <div>{this.state.currentBeer.description}</div>

      <button className="addtocart" onClick={this.addToCart.bind(this)}>Add to Cart</button>
      <button className="addtocart" onClick={this.removeFromCart.bind(this)}>Remove from Cart</button>

    </div>
    : null

     return(

        <div>

          <div className='cartContainer'>


            <div className='price'>
              <Cart />
              ${'' + this.state.totalPrice}

              <ul>   {this.state.beerList}  </ul>

            </div>

          </div>

          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleChange.bind(this)}
            placeholder="Search beer"
          />

          <ul onClick={this.handleClick.bind(this)} >
            {beers.map(function(value) {
              return <li className="listclass">
                {value.brewery + ' ' + value.beername}
                <img src={process.env.PUBLIC_URL + `/images/${value.image}.jpg`} style={{width: 30, height: 45}} alt="broken" />
              </li>
            })}

          </ul>

          {currentBeerDiv}

        </div>

    )
  }
}

export default List
