const staticPwa = "PWA-APP-SITE";
const assets = [
  "/",
  "/index.html",
  "/icon.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPwa).then(cache => {
      console.log("Caching assets:", assets);  // Add logging to see if caching is successful
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("Service worker registered"))
      .catch(err => console.error("Service worker not registered:", err));
  });
}

// Request permission from the user
Notification.requestPermission().then(function (result) {
    if (result === 'granted') {
      // Schedule the daily notification
      scheduleDailyNotification();
    } else {
      // Handle the case where the user doesn't grant permission
    }
  });
  
  function scheduleDailyNotification() {
    // Set the notification time (6:00PM)
    const notificationTime = new Date();
    notificationTime.setHours(18, 0, 0, 0); // Set hours, minutes, seconds, milliseconds
  
    // Check if the notification time has already passed for the current day
    const now = new Date();
    if (notificationTime < now) {
      // If it has passed, calculate the time for the next day
      notificationTime.setDate(notificationTime.getDate() + 1);
    }
  
    // Calculate the time difference between now and the notification time
    const timeDiff = notificationTime.getTime() - now.getTime();
  
    // Schedule the notification using setTimeout
    setTimeout(() => {
      // Create the notification object
      const notification = new Notification('Daily Notification', {
        body: 'This is a daily notification at 6:00PM.',
        icon: 'icon.png' // Replace with your icon path
      });
  
      // Display the notification
      notification.showNotification();
    }, timeDiff);
  }
