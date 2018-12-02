import React, { Component } from 'react';
import {Venue } from './venue';
import { Search } from './search';
import 'whatwg-fetch';

class App extends Component {

  constructor() {

    super();

    this.state = {
      venues: []
    };

  }

  handleSubmit(query) {
    this.getVenues(query);
  }

  componentDidMount() {
    this.getVenues('Pubs');
  }

  getLocation(callback) {
    navigator.geolocation.getCurrentPosition(function(location) {
      callback(location.coords.latitude + ',' + location.coords.longitude)
    })
  }

  getVenues(query) {

    let setVenueState = this.setState.bind(this);

    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    this.getLocation(function (latlong) {

      const qs = {
        client_id: '13J0BEBZY2UFW2IDD5YAESWL3OCDU0QZS1CXMF0NBVKCZENC',
        client_secret: 'Y0CPZFJG5ORLABZ3GQOHJ1WOFFPCGDKJTFLRCODFUW2D4GB2',
        limit: 3,
        query: query,
        v: '20170801',
        ll: latlong
      };

      fetch(venuesEndpoint + new URLSearchParams(qs), {
        method: 'GET'
      }).then(response => response.json()).then(response => {
        setVenueState({venues: response.response.groups[0].items});
      });

    });

  }

  render() {

    var venueList = this.state.venues.map((item, i) =>
      <Venue key={i} name={item.venue.name}/> //Create a new "name attribute"
    );

    return (
      <div>
        <header>Lunch Places</header>
        <Search onSubmit={(value)=>this.handleSubmit(value)}/>
        <ul>
          {venueList}
        </ul>
      </div>
    );
  }

}

export default App;
