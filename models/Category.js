import mongoose from 'mongoose';
import slugify from 'slugify';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
});
categorySchema.pre('validate', function(next) {
    this.slug = slugify(this.name, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    next();
});
const Category = mongoose.model('Category', categorySchema);

export { Category };