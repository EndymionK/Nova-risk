import React, { useEffect, useState, useMemo } from "react";

const StarImageSearch = ({ starName }) => {
  const [imageURL, setImageURL] = useState(null);

  const searchQuery = useMemo(() => {
    return `star ${starName}`;
  }, [starName]);

  useEffect(() => {
    const apiKey = 'AIzaSyC2NLG-LYlqxwzLBZXcPdCxANMPVAsJA4Q';
    const cx = '55dfd2bd54b51463a';

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Verifica si se encontraron resultados
        if (data.items && data.items.length > 0) {
          // Verifica si la propiedad pagemap.cse_image existe y tiene al menos un elemento
          if (data.items[0].pagemap && data.items[0].pagemap.cse_image && data.items[0].pagemap.cse_image.length > 0) {
            const firstImageURL = data.items[0].pagemap.cse_image[0].src;
            setImageURL(firstImageURL);
          } else {
            console.log('No se encontraron resultados de imagen para la estrella.');
          }
        } else {
          console.log('No se encontraron resultados de imagen para la estrella.');
        }
      })
      .catch((error) => {
        console.error('Error al buscar la imagen de la estrella:', error);
      });
  }, [searchQuery]);

  return (
    <div>
      {imageURL ? (
        <img src={imageURL} alt={starName} />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default StarImageSearch;
