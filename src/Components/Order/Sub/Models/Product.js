export default class Product {
     constructor(id,name,sizes_id,categories_id,available,price,note) {
        this.id = id;
        this.name = name;
        this.sizes_id = sizes_id;
        this.categories_id = categories_id;
        this.available = available;
        this.price = price;
        this.note = note;
    }

    get p_id() {
        return this.id;
    }
    set p_id(x) {
        this.id = x;
    }
    get p_name() {
        return this.name;
    }
    set p_name(x) {
        this.name = x;
    }
    get p_sizes_id() {
        return this.sizes_id;
    }
    set p_sizes_id(x) {
        this.sizes_id = x;
    }
    get p_categories_id() {
        return this.categories_id;
    }
    set p_categories_id(x) {
        this.categories_id = x;
    }
    get p_available() {
        return this.available;
    }
    set p_available(x) {
        this.available = x;
    }
    get p_price() {
        return this.available;
    }
    set p_price(x) {
        this.available = x;
    }
    get p_note() {
        return this.note;
    }
    set p_note(x) {
        this.note = x;
    }
}
