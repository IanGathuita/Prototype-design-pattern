/*Helps in creating an exact copy of an object. Iterating over the properties one by one as you copy is
inefficient because some properties are private and only visible to the object. Sometimes, you might not
even know the object's concrete class*/

/* Prototype pattern delegates the cloning process to the actual objects that are being cloned.*/

type skillLevels = { Java:string, Js:string, css:string};

class MePrototype{
    age: number = 0;
    myName: string ='';
    skillLevels: skillLevels = {Java:'', Js:'', css:''};

    clone():MePrototype{
        //Object.create() method creates a new object, 
        //using an existing object as the prototype of the newly created object.
        const clone = Object.create(this);
        clone.skillLevels = Object.create(this.skillLevels);
        return clone;
    }
}


//client code
let me = new MePrototype();
me.age = 21;
me.myName = 'Ian';
me.skillLevels = {Java: 'intermediate', Js:'intermediate', css :'advanced'};

let meClone: MePrototype = me.clone();


console.log ("Does cloned object point to original object's memory location? ", me === meClone);


console.log(meClone.age);
console.log(meClone.myName);
console.log(meClone.skillLevels.css);
console.log(meClone.skillLevels.Java);
console.log(meClone.skillLevels.Js);

