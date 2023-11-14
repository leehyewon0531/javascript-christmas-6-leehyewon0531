class Menu {
  #name;
  #price;

  constructor(name, price) {
    this.#name = name;
    this.#price = price;
  }

  get get_name() {
    return this.#name;
  }

  get get_price() {
    return this.#price;
  }
}

export default Menu;