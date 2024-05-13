import mongoose from 'mongoose';
import UserSchema from '../schemas/UserSchema';
import mongoosePaginate from 'mongoose-paginate-v2';

UserSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { updatedAt: new Date() });
    
    next();
});

UserSchema.pre('save', function (next) {
    if (!this.isNew) this.updatedAt = new Date();

    next();
});

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', UserSchema, 'Users');
User.createIndexes();

export default User;