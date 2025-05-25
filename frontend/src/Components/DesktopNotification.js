import React, { Component } from "react";

class DesktopNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
        if (permission === "granted") {
          console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      });
    }
  }

  showNotification() {
    console.log("Attempting to show notification");

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        console.log("Notification permission granted");
        try {
          const notification = new Notification("Todo Added", {
            body: "Your todo has been added successfully!",
          });

          setTimeout(notification.close.bind(notification), 5000);
        } catch (error) {
          console.error("Error creating notification:", error);
        }
      } else if (Notification.permission === "denied") {
        console.log("Notification permission denied");
      } else {
        console.log("Notification permission not yet requested");
      }
    } else {
      console.log("Browser does not support desktop notification");
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.showNotification}>Show notification</button>
      </div>
    );
  }
}

const desktopNotificationInstance = new DesktopNotification();

export default desktopNotificationInstance;
