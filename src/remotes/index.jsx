import axios from "axios";


const WritonAxios = axios.create({
    baseURL : 'https://www.tarae.store'
});


const postLoginUser=(userEmail,userPassword)=>WritonAxios.post('/api/user/login',{userEmail,userPassword});

const getAccessToken=()=>WritonAxios.get('/api/user/login/reissue-token',{headers:{access:localStorage.getItem('accessToken'),refresh:localStorage.getItem('refreshToken')}})

const patchLogoutUser=()=>WritonAxios.patch('/api/user/logout','',{headers:{access:localStorage.getItem('accessToken')}});

export {postLoginUser,patchLogoutUser,getAccessToken}