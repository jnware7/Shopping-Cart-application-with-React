import React from 'react';

class List extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      beers : [],
      searchString: ''
    }
  }

  componentDidMount() {
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
      console.log('fetch log', this.state.beers);
    })
  }

  handleChange(event) {
    this.setState( { searchString: event.target.value} )
  }

  render() {
    console.log('render log', this.state.beers);

    // let beerlist = this.state.beers.results
    // let beerDomElements

    // for ( var beer in beerlist ) {
    //   <li key={beer.id} beername={beer.beername}> {beer.beername} </li>
    // }

    //   if (beerlist) { beerDomElements = beerlist.map( (beer, index) =>
    //     <li
    //       key={beer.id}
    //       beername={beer.beername}
    //       index={index}
    //     > {beer.beername} </li>
    //   )
    // }
    // else {beerDomElements = null}


  //   if (this.state.beers) { beerlist = this.state.beers.( (beer, index) =>
  //     <li
  //       key={beer.id}
  //       beername={beer.beername}
  //       index={index}
  //     > {beer.beername} </li>
  //   )
  // }
  //   else { beerlist = null}

    let beers  = this.state.beers,
        searchString = this.state.searchString.trim().toLowerCase()

    if (searchString.length > 0) {
      beers = beers.filter(function(value) {
        return value.beername.toLowerCase().match( searchString )
      })
    }

    return(

        <div>

          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleChange.bind(this)}
            placeholder="Search beer"
          />

          <ul>
            {beers.map(function(value) {
              return <div>
                {value.beername}
                <img src={process.env.PUBLIC_URL + `/images/${value.image}.jpg`} style={{width: 180, height: 225}} alt="broken" />
              </div>
            })}
          </ul>


        </div>

    )
  }
}

export default List

//to import an image
  // let cardBack = <img src={process.env.PUBLIC_URL + "/cards/poke.jpg"} style={{width: 180, height: 225}} alt="broken" />

  // const { beers } = this.props
// <tbody>
//   {/* { beers.map((beer) =>
//   <Beer
//     key={beer.id}
//     {...beer}
//   />
// )} */}
//
// Hi
// </tbody>
