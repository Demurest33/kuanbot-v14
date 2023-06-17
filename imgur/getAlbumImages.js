import Request from 'axios';

export default async function getAlbumImages(albumId) {
    let images = [];
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.imgur.com/3/album/${albumId}/images`,
        headers: { 
            'Authorization': `${process.env.bearerToken}`,
        }
    };

    const response = await Request(config).catch((error) => {console.log(error);});

    response.data.data.forEach(image => {
        //log the iamge size
        let mbSize = image.size/1048576;
        if(mbSize >= 5){
            console.log(`Image ${image.link} is ${mbSize} MB`);
        }
        images.push(image.link);
    });

    return images;

}
// getAlbumImages('RlfKUv6');
