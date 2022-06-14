import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'


const ImageGalleryItem = (props) => {

   const { image, onClick } = props;

    return(
        <li className={s.imageGalleryItem}>
            <img src={image.webformatURL} alt={image.tags} className={s.imageGalleryItem__image} onClick={() => onClick(image.largeImageURL)}/>
        </li>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  };

export default ImageGalleryItem;