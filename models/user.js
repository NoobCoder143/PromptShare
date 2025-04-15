import {Schema,model,models} from "mongoose";

const UserSchema=new Schema({
   email:{
    type: String,
    unique:[true,"Email already exists!"],
    required:[true,"Email is required!"],
},
username:{
    type: String,
    required:[true,"Username is required!"],
    match:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"Username invalid, it should contain 8-20 alphanumeric letters!"]
},
image:{
    type: String
}

}
);
//models.User because we are first checking if the User exists in the models object ,if yes then we are reusing it
//this is becuz in next this route is not always running it only runs when it is called 
const User=models.User || model("User",UserSchema);
export default User;