const publicKey= 'BC2_L_A8XzOUeVeNRnR8Kda39elR6lAlK4ddmurzO5tC1dYPFB27_Bij1alAcNbWKWFMzFMkkzyCh2pvsTZCXVI';

if('serviceWorker' in navigator){
    send().catch(err => console.log(err));

}

async function send(){
    console.log('Rgistring the worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope:'/'
    });

    console.log('Registioned worker completed');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });

    console.log('Push registed');

    console.log('sending push');
    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type':'application/json'
        }
    });

    console.log('psh sent');
};

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }