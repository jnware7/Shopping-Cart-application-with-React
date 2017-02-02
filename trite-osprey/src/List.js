import React, {PropTypes} from 'react';


class List extends React.Component{

  static PropTypes = {
    beers: PropTypes.array.isRequire
  }

  constructor(props) {
    super(props)
    this.state = {
      beers : [],
      currentBeer: null,
      searchString: '',
      visible: false,
      active: this.props.active || 0
    }
  }

  updateCurrentBeer(beerIndex) {

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

  componentDidMount() {
      console.log('beers', this.state.beers)
      if ( this.state.beers[0] ) {
         let firstBeerName = this.state.beers[0].beername
         console.log(firstBeerName);
       }
  }

  render() {
    // const {beers} = this.props.beers

    let beers  = this.state.beers,
        searchString = this.state.searchString.trim().toLowerCase()

    if (searchString.length > 0) {
      beers = beers.filter(function(value) {
        return value.beername.toLowerCase().match( searchString )
      })
    }

    let firstBeer = beers[0]

    console.log('these are the beers', beers);

    if ( beers[0] ) {
       let firstBeerName = beers[0].beername
       console.log(firstBeerName);
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
            <div>{this.state.currentBeer.abu}</div>
            <div> ${this.state.currentBeer.price}.00 </div>
          </div>
      </div>
      <div>{this.state.currentBeer.description}</div>
      <button className="addtocart">Add to Cart</button>
    </div>
    : null

     return(

        <div>

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
