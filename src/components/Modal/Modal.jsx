import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css'

class Modal extends React.Component{

    componentDidMount() {
        window.addEventListener('keydown', this.modalClose)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.modalClose)
    }

    modalClose = event => {
        if(event.code === 'Escape' || event.target === event.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        const {url} = this.props;

        return (
            <div className={s.backdrop} onClick={this.modalClose}>
                <div className={s.modal}>
                    <img src={url} alt="gallery item"/>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default Modal;