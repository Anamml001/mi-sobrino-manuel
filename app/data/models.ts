import mongoose, { Schema, Document, Model } from "mongoose";

const { Types: { ObjectId } } = Schema;

// Definición de tipos para los documentos

interface UserDoc extends Document {
    name: string;
    surname: string;
    birthdate: Date;
    email: string;
    password: string;
    role: "regular" | "admin";
}

interface PostDoc extends Document {
    author: typeof ObjectId;
    title: string;
    image?: string;
    video?: string;
    text: string;
    date: Date;
    likes?: typeof ObjectId[];
}

interface CommentDoc extends Document {
    post: typeof ObjectId;
    author: typeof ObjectId;
    text: string;
    date: Date;
}

interface ProductDoc extends Document {
    name: string;
    image: string;
    description: string;
    stock: number;
    price: number;
}

interface ItemDoc extends Document {
    product: ProductDoc;
    quantity: number;
}

interface CartDoc extends Document {
    items: ItemDoc[];
}

interface OrderDoc extends Document {
    buyer: typeof ObjectId;
    cart: CartDoc;
    date: Date;
}

// Definición de esquemas

const userSchema = new Schema<UserDoc>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["regular", "admin"],
        default: "regular"
    }
});

// const postSchema = new Schema<PostDoc>({
//     author: {
//         type: ObjectId,
//         required: true,
//         ref: "User"
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String
//     },
//     video: {
//         type: String
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     likes: [{
//         type: ObjectId,
//         ref: "User"
//     }]
// });

// const commentSchema = new Schema<CommentDoc>({
//     post: {
//         type: ObjectId,
//         required: true,
//         ref: "Post"
//     },
//     author: {
//         type: ObjectId,
//         required: true,
//         ref: "User"
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     }
// });

// const productSchema = new Schema<ProductDoc>({
//     name: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     stock: {
//         type: Number,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     }
// });

// const itemSchema = new Schema<ItemDoc>({
//     product: productSchema,
//     quantity: {
//         type: Number,
//         default: 1,
//         required: true
//     }
// });

// const cartSchema = new Schema<CartDoc>({
//     items: [itemSchema]
// });

// const orderSchema = new Schema<OrderDoc>({
//     buyer: {
//         type: ObjectId,
//         required: true,
//         ref: "User"
//     },
//     cart: cartSchema,
//     date: {
//         type: Date,
//         required: true
//     }
// });

// Definición de modelos

const User: Model<UserDoc> = mongoose.model<UserDoc>("User", userSchema);
// const Post: Model<PostDoc> = mongoose.model<PostDoc>("Post", postSchema);
// const Comment: Model<CommentDoc> = mongoose.model<CommentDoc>("Comment", commentSchema);
// const Product: Model<ProductDoc> = mongoose.model<ProductDoc>("Product", productSchema);
// const Item: Model<ItemDoc> = mongoose.model<ItemDoc>("Item", itemSchema);
// const Cart: Model<CartDoc> = mongoose.model<CartDoc>("Cart", cartSchema);
// const Order: Model<OrderDoc> = mongoose.model<OrderDoc>("Order", orderSchema);

export type {
    UserDoc,
    // PostDoc,
    // CommentDoc,
    // ProductDoc,
    // ItemDoc,
    // CartDoc,
    // OrderDoc
}

export {
    User,
    // Post,
    // Comment,
    // Product,
    // Item,
    // Cart,
    // Order
};