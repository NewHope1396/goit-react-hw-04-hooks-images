import axios from 'axios';
import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from 'components/App/App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { MySpiner } from 'components/MySpiner/MySpiner';
import { Modal } from 'components/Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = keyWord => {
    setPage(1);
    setQuery(keyWord);
    setLoading(true);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async () => {
      const images = await axios.get(
        `?key=25354939-b34ef3161dfabf3cda0874337&q=${query}&image_type=photo&orientation=horizontal&per_page=15&page=${page}`
      );
      return images.data.hits;
    };

    if (page === 1) {
      fetchImages().then(images => {
        setImages(images);
        setLoading(false);
      });

      return;
    }

    fetchImages().then(newImages => {
      setImages(images => [...images, ...newImages]);
      setLoading(false);
    });
  }, [page, query]);

  const loadMore = () => {
    setPage(page => page + 1);
    setLoading(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container>
      <Searchbar onSearchSubmit={onSubmit}></Searchbar>
      {!loading && (
        <ImageGallery
          images={images}
          onImageClick={setSelectedImage}
        ></ImageGallery>
      )}
      {loading && <MySpiner></MySpiner>}
      {images.length !== 0 && !loading && <Button loadMore={loadMore}></Button>}
      {selectedImage && (
        <Modal image={selectedImage} closeModal={closeModal}></Modal>
      )}
    </Container>
  );
};
