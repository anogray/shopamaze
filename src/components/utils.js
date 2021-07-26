const domainType = ()=>{

const backendUrl = "https://shopamaze.herokuapp.com";

const __DEV__ = document.domain === 'localhost'
const backDomain = __DEV__ ? "" : backendUrl;

return backDomain;

}

export default domainType;