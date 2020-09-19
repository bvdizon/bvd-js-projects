
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName; 
    }

    greeting() {
        return `Good day, ${this.firstName} ${this.lastName}`;
    }
}

// creating Customer class inheriting Person class properties
class Customer extends Person {
    constructor(firstName, lastName, phone, membership = 'Free' ) {
        //super() is used to access and call functions on an object's parent.
        super(firstName, lastName);
        // specific properties of Customer class
        this.phone = phone;
        this.membership = membership;
    }

    // static function for Customer class
    static iterator() {
        let str = '';
        for (let i = 0; i <= 10; i++) {
            str = str + i;
            console.log(str);
        }
    }
}
// instantiation of Customer class
const brian = new Customer('brian', 'dizon', '0943-405-3176', 'Gold');
console.log(brian);
    // returns: Customer {firstName: "brian", lastName: "dizon", phone: "0943-405-3176", membership: "Gold"}
console.log(brian.greeting());
    //returns: Good day, brian dizon
console.log(Customer.iterator());


