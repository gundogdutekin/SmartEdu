import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    
});
courseSchema.pre('validate', function(next) {
    this.slug = slugify(this.name, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    next();
});

const Course = mongoose.model('Course', courseSchema);

export { Course };