import React from 'react';

class List extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      beers : [],
      searchString: '',
      visible: false,
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

  hide() {
    this.setState({visible: false})
  }

  show() {
    this.setState({visible: true})
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

          <ul onClick={this.show.bind(this)}>
            {beers.map(function(value) {
              return <li className="listclass">
                {value.brewery + ' ' + value.beername}
                <img src={process.env.PUBLIC_URL + `/images/${value.image}.jpg`} style={{width: 30, height: 45}} alt="broken" />
              </li>
            })}

          </ul>

          <div className={this.state.visible ? "popout" : "invisible"}>
            <button onClick={this.hide.bind(this)} className="closebutton">X</button>
            <div>Image</div>
            <div>Header + Beername</div>
            <div>Brewery</div>
            <div>Description</div>
            <div>ABU</div>
            <div>Price</div>
            <button className="addtocart">Add to Cart</button>
          </div>


        </div>

    )
  }
}

export default List
