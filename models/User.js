import mongoose from "mongoose";
import bcrypt from "bcrypt";


const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {     
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student'
    },
    courses:[{   
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});
userSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });

})

const User = mongoose.model('User', userSchema);



export { User };