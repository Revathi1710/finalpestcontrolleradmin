function  Logout(){
    localStorage.removeItem('userId'); // Remove vendorId
    localStorage.removeItem('token'); // Remove vendorId
    window.location.href = '/login';
}
export default Logout;