import React from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from 'components/ImageGallery/ImageGallery';

export default class App extends React.Component {

  state = {
    filter: '',
  }

  onSubmit = searchString =>{
    this.setState({filter:searchString})
  }


  render() {
    return(
      <div>
        <Searchbar onSubmit={this.onSubmit}/>
        <ImageGallery filter={this.state.filter}/>
      </div>
    )
  }
}