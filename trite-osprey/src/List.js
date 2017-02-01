import React from 'react';

class List extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      beers : [
        {beername: 'beerone'},
        {beername: 'beertwo'},
        {beername: 'beerthree'}
    ],
      searchString: ''
    }
  }

  handleChange(event) {
    this.setState( { searchString: event.target.value} )
  }

  render() {

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
              return <div>{value.beername}</div>
            })}
          </ul>

          {/* <Beerlist /> */}

        </div>

    )
  }
}

export default List

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
