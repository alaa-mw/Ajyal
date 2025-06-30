// import noImage from '../assets/default.png';

//optimaize images to speed up image load

const getImageUrl = (url: string) => {
  // if(!url) return noImage;

  console.log("path", 'http://127.0.0.1:8000/' + url);
  
  // return 'http://192.168.232.186:8000/' + url;
  return 'http://127.0.0.1:8000/' + url;
}

export default getImageUrl;