import Request from 'axios';

export default async function updateAlbum(albumId, title, description) {

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `https://api.imgur.com/3/album/${albumId}?title=${title}&description=${description}`,
        headers: { 
            // 'Authorization': `${process.env.bearerToken}`,
            'Authorization': `Bearer ba2d895e235e92acfda0ec7c29076cc24fb6ac96`
        },
    };

    const response = await Request(config).catch((error) => {console.log(error);});
    return response.data;
}

async function main(){
    const test = await updateAlbum('CNLyFhr', 'Love live Doujin', 'maki nishikino, rin hoshiroza, hanayo koizumi');
    console.log(test);
}
main();