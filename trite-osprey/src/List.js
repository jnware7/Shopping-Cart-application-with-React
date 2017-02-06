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
      beerList: [],
      totalPrice: 0,
      currentBeerObjects: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.getAllBeers()
  }

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

  handleClick(event, index) {
    this.setState({visible: true, active: index, currentBeer: this.state.beers[index] })
  }

  addToCart() {
    let { currentBeer, beerList, currentBeerObjects } = this.state
    currentBeerObjects.push(currentBeer)
    beerList.push(currentBeer.beername)

    let priceArray = [];
    Object.keys(currentBeerObjects).forEach(function(key) {
      let val = currentBeerObjects[key]["price"];
      priceArray.push(val);
    });

    let cartPrice = priceArray.reduce((a,b) => a + b)

    this.setState({
      totalPrice: cartPrice,
      beerList,
      currentBeerObjects
    })

  }

  removeFromCart() {
    let { currentBeer, beerList, currentBeerObjects } = this.state

    let id = currentBeer.id;
    for (var i = 0; i < currentBeerObjects.length; i++) {
        if (currentBeerObjects[i].id === id) {
            currentBeerObjects.splice(i, 1);
            break;
        }
    }

    let priceArray = [0];
    Object.keys(currentBeerObjects).forEach(function(key) {
      let val = currentBeerObjects[key]["price"];
      priceArray.push(val);
    });

    let beerName = currentBeer.beername;
    for (var j = 0; j < beerList.length; j++) {
        if (beerList[j] === beerName) {
            beerList.splice(j, 1);
            break;
        }
    }

    let cartPrice = priceArray.reduce((a,b) => a + b)

    this.setState({
      totalPrice: cartPrice,
      beerList,
      currentBeerObjects
    })

  }

  render() {

    let beers  = this.state.beers,
        searchString = this.state.searchString.trim().toLowerCase(),
        beerList = this.state.beerList

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

      <div className='description'>{this.state.currentBeer.description}</div>

      <button className="addtocart" onClick={this.addToCart.bind(this)}>Add to Cart</button>
      <button className="addtocart" onClick={this.removeFromCart.bind(this)}>Remove from Cart</button>

    </div>
    : null

    const beerView = beers.map(function(value, index) {
      return (
      <div  onClick={ () => this.handleClick(event, index) } className="beerdisplay" >
        <img key={index} src={process.env.PUBLIC_URL + `/images/${value.image}.jpg`} style={{width: 120, height: 180}} alt="broken" />
      </div>
      )
    }, this)


     return(

        <div>
{/*
          <div className='cartContainer'>


            <div className='price'>
              <Cart className='beercartlist'/>
              ${'' + this.state.totalPrice}

              <ul onClick={this.addToCart.bind(this)} >
                {beerList.map(function(value) {
                  return (
                    <div>
                      {value}
                    </div>
                  )
                })}
              </ul>

            </div>

          </div> */}

          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleChange.bind(this)}
            placeholder="Search beer"
          />

          <div className='wrapper'>
            {beerView}
          </div>

          {currentBeerDiv}

                    <div className='cartContainer'>


                      <div className='price'>
                        <Cart className='beercartlist'/>
                        ${'' + this.state.totalPrice}

                        <ul onClick={this.addToCart.bind(this)} >
                          {beerList.map(function(value) {
                            return (
                              <div>
                                {value}
                              </div>
                            )
                          })}
                        </ul>

                      </div>

                    </div>
        </div>

    )
  }
}

export default List
