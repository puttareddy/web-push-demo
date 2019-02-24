console.log('Service weor');

self.addEventListener('push', e => {
    console.log(e.data);
   // const data =  e.data.json();
    console.log('phsh received');
    self.registration.showNotification('sampel tim',   {
        body:'notifiction recived',
        icon:'http://image.ibb.co/frYOFd/tmllogo.png'
    });
});