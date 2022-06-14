import PropTypes from 'prop-types';
import React from "react";
import axios from "axios";
import Loader from 'components/Loader/Loader'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import s from './ImageGallery.module.css'


export default class ImageGallery extends React.Component {

    state = {
        images: [],
        error: null,
        status: 'idle',
        page: 1,
        totalHits: 0,
        showModal: false,
        modalUrl: '',
    }

    async componentDidUpdate(prevProps, prevState) {
        
        const isFilterChanged = this.props.filter !== prevProps.filter;
        const isPageChanged = this.state.page !== prevState.page;
        const actualPage = isFilterChanged ? 1 : this.state.page;
        const actualImages = isFilterChanged ? [] : this.state.images;

        if (isFilterChanged){
            this.setState({
                images: [],
                error: null,
                status: 'idle',
                page: 1,
                totalHits: 0,
            })
            return
        }        

        if(this.state.status==='idle' || isPageChanged){

            try {
                this.setState({status: 'pending'})
                const response = await axios.get(`https://pixabay.com/api/?q=${this.props.filter}&page=${actualPage}&key=26974006-daeb29fcab66c9b2b77884f92&image_type=photo&orientation=horizontal&per_page=12`)
                this.setState({
                    images: [...actualImages, ...response.data.hits],
                    totalHits: response.data.totalHits, 
                    status: 'resolved',
                    page: actualPage,
                })

            } catch (error) {
                this.setState({error: error, status: 'rejected'})
            }
        }
        else{
            const loadBtn = document.getElementById("load-more");
            if(loadBtn)
            loadBtn.scrollIntoView({block: "center", behavior: "smooth"});
        }
    }

    handleLoadMoreClick = () => {
        this.setState(prevState => ({page: prevState.page +1}))
    }


    handleGalleryItemClick = (url) => {
        this.setState({modalUrl: url})
        this.toggleModal()
    }

    toggleModal = () => {
        this.setState(state => ({
            showModal: !state.showModal
        }))
    }

    render() {
        const { images, error, status, totalHits, showModal, modalUrl} = this.state

        if (status === 'pending') {
            return(
                <div className={s.gallery__container}>
                <ul className={s.imageGallery}>
                    {images.map(image =>
                    <ImageGalleryItem 
                        key={image.id} 
                        image={image}
                        onClick={this.handleGalleryItemClick}
                    />
                    )}
                </ul>
                <Loader/>               
            </div>
            )
        }

        if (status === 'rejected') {
            return <div className={s.gallery__container}><p>An error occurred: {error.message} {error.response.data}</p></div>
        }

        if (status === 'resolved') {
            return(
                <div className={s.gallery__container}>
                    {images.length === 0 && <h2>there are no images found for {this.props.filter}</h2>}
                    <ul className={s.imageGallery}>
                        {images.map(image =>
                        <ImageGalleryItem 
                            key={image.id} 
                            image={image}
                            onClick={this.handleGalleryItemClick}
                        />
                        )}
                    </ul>
                    <div id="load-more">
                        {images.length < totalHits && <Button onClick={this.handleLoadMoreClick}/>}
                    </div>   
                    {showModal && <Modal url={modalUrl} onClose={this.toggleModal}/>}                
                </div>
            )
        }
    }
}

ImageGallery.propTypes = {
    filter: PropTypes.string.isRequired,
  };