function  vendorLogout(){
    localStorage.removeItem('vendorId'); // Remove vendorId
    localStorage.removeItem('vendortoken'); // Remove vendorId
    window.location.href = '/vendor/login';
}
export default vendorLogout;