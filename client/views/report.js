export default /*@ngInject*/ function ($q, $http, $auth, SweetAlert) {

  this.report = () => {
    this.getGeo()
      .then(res => $http.post('/api/v1/activity', { latitude: res.latitude, longitude: res.longitude }))
      .then(res => SweetAlert.swal("It worked!", "Report sent successfully!", "success"))
      .catch(error => SweetAlert.swal("It failed!", "Please try again", "error"))
  }

  this.user = $auth.getPayload();

  this.logout = () => { $auth.logout(); };

  this.getGeo = () => {
    let q = $q.defer();
    navigator.geolocation.getCurrentPosition(pos => { q.resolve(pos.coords); }, error => { q.reject(error); });
    return q.promise;
  }

}
