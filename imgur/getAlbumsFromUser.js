import Request from 'axios';

export default async function getAlbumsFromUser(username, doujinshi = false) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.imgur.com/3/account/${username}/albums`,
        headers: { 
            'Authorization': `${process.env.bearerToken}`,
            // 'Authorization': `Bearer ba2d895e235e92acfda0ec7c29076cc24fb6ac96`,
        }
    };
    const response = await Request(config).catch((error) => {console.log(error);});
    if(doujinshi) return response.data.data.filter(album => album.title.includes("doujin") 
        || album.title.includes("Doujin")
        || album.title.includes("doujinshi")
        || album.title.includes("Doujinshi")
    );

    //return all albums that are not doujinshi
    return response.data.data.filter(album => !album.title.includes("doujin")
        && !album.title.includes("Doujin")
        && !album.title.includes("doujinshi")
        && !album.title.includes("Doujinshi")
    );
}


// async function main(){
//     const test = await getAlbumsFromUser('demurest33', true);
//     console.log(test);
// }
// main();