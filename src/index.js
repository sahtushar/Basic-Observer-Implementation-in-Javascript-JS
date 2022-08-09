/*
Libs included:
    underscore lodash chai sinon sinon-chai mocha async request q bluebird jsdom
*/
//Check Console
class Observable {
  constructor() {
    this.observers = [];
  }

  addObserver(category, observer) {
    let existingIndex = this.observers.findIndex(
      (item) =>
        item.observer.name === observer.name && item.category === category
    );
    if (existingIndex == -1) {
      this.observers.push({
        category,
        observer
      });
    }
  }

  removeObserver(category, observer) {
    const index = this.observers.findIndex(
      (item) =>
        item.observer.name === observer.name && item.category === category
    );
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  dataUpdated(category, data) {
    this.observers.map((item) => {
      //console.log("Data is updated for:"+item.name);
      if (item.category === category) {
        item.observer.getUpdate(data);
      }
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  getUpdate(data) {
    // Some business logic
    console.log("dataReceived, name = ", this.name, data);
  }
}

// Usage

const weatherForecast = new Observable();

const delhiStation = new Observer("delhiStation");
const bangaloreStation = new Observer("bangaloreStation");

weatherForecast.addObserver("categoryA", delhiStation);
weatherForecast.addObserver("categoryB", bangaloreStation);

weatherForecast.dataUpdated("categoryA", { temp: 50, wind: 10 });

weatherForecast.removeObserver("categoryB", bangaloreStation);

weatherForecast.dataUpdated("categoryB", { temp: 45, wind: 15 });
