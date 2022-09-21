/*NOTE: In the case of Shallow copy, TS will create the new object from the existing object and then copying the value type fields of the
 current object to the new object. in the case of reference type, it will only copy the reference, not the referred object itself.*/

class ComponentWithBackReference {
    public prototypeField:PrototypeClass;

    constructor(prototypeParam: PrototypeClass) {
        this.prototypeField = prototypeParam;
    }
}

class PrototypeClass {
    public primitive: any;
    public component!: object;
    // this property references an instance of 'ComponentWithBackReference' which itself has a reference back to an instance of this prototype class
    public circularReference!: ComponentWithBackReference;  

    public clone(): this {
        const clone = Object.create(this);
        //don't have to modify clone.primitive field becase it is a primitive data type ; value will be copied, not reference
        //modify  clone.component because I want a deep copy
        clone.component = Object.create(this.component);        
        //clone 'circularReference' object which in it has a 'protoTypeClass' object which also has to be cloned
        //with spread operator, we can create new objects easily with modified properties
        //nested object should point to the cloned object, instead of the original object. Spread operator can be handy for this case.        
        clone.circularReference = {
            ...this.circularReference,
            prototypeField: { ...this },
        };

        return clone;
    }
}




function clientCode() {
    const p1 = new PrototypeClass();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
        console.log('Primitive field values have been carried over to a clone.');
    } else {
        console.log('Primitive field values have not been copied.');
    }
    if (p1.component === p2.component) {
        console.log('Simple component has not been cloned.');
    } else {
        console.log('Simple component has been cloned.');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned.');
    } else {
        console.log('Component with back reference has been cloned.');
    }

    if (p1.circularReference.prototypeField === p2.circularReference.prototypeField) {
        console.log('Component with back reference is linked to original object.');
    } else {
        console.log('Component with back reference is linked to the clone.');
    }
}

clientCode();