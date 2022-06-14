import React from "react";
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'

class Searchbar extends React.Component {

    state = {
        searchString: ''
    }

    handleChange = event => {
        this.setState({searchString:event.target.value.toLowerCase()})
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchString.trim() === '') {
            alert('input string to search');
            return;
        }

        this.props.onSubmit(this.state.searchString);
//        this.setState({searchString: ''});
    }

    render() {
        return(
            <header className={s.searchbar}>
                <form className="form">
                    <button type="submit" onClick={this.handleSubmit}>
                        <span className="button-label">Search</span>
                    </button>
        
                    <input
                    className="input"
                    type="text"
                    placeholder="Search images and photos"
                    value={this.state.searchString}
                    onChange={this.handleChange}
                    />
                </form>
            </header>
            )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

export default Searchbar;