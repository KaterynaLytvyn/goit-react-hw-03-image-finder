import PropTypes from 'prop-types';
import s from './Button.module.css'

const Button = (props) => {

    const { onClick } = props;

    return <button type="button" className={s.button} onClick={onClick}>Load More</button>
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

export default Button

