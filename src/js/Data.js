export default class Data {
  constructor() {
    this.memory = [
      { id: 69650237, name: 'iPhone XR', cost: 60000 },
      { id: 69650247, name: 'Samsung Galaxy S10+', cost: 80000 },
      { id: 69650257, name: 'Huawei View', cost: 50000 },
    ];
  }

  getId() {
    const id = Math.floor(Math.random() * 100000000);
    if (this.memory.find((e) => e.id === id)) {
      return this.getId();
    }
    return id;
  }

  create(id, name, cost) {
    this.memory.push({ id, name, cost: +cost });
  }

  update(id, name, cost) {
    this.read(id).name = name;
    this.read(id).cost = cost;
  }

  read(id) {
    return this.memory.find((e) => e.id === id);
  }

  delete(id) {
    const idx = this.memory.findIndex((e) => e.id === id);
    this.memory.splice(idx, 1);
  }
}
