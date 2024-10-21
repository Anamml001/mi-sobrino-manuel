import mongoose, { Schema, Document, Model, Types } from "mongoose";

const { ObjectId } = Types;

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
    stock: boolean;
    price: number;
}

interface ItemDoc extends Document {
    product: ProductDoc;
    description: string;
    quantity: number;
}

interface CartDoc extends Document {
    items: ItemDoc[];
}

interface OrderDoc extends Document {
    buyer: typeof ObjectId;
    cart: CartDoc;
    shippingAddress: string;
    phoneNumber: number;
    date: Date;
}

// interface LedgerDoc extends Document {
//     ledgers: LedgerDoc[]
// }

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

const postSchema = new Schema<PostDoc>({
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }]
});

const commentSchema = new Schema<CommentDoc>({
    post: {
        type: ObjectId,
        required: true,
        ref: "Post"
    },
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const productSchema = new Schema<ProductDoc>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const itemSchema = new Schema<ItemDoc>({
    product: productSchema,
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
});

const cartSchema = new Schema<CartDoc>({
    items: [itemSchema]
});

const orderSchema = new Schema<OrderDoc>({
    buyer: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    cart: cartSchema,
    shippingAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,

    },
    date: {
        type: Date,
        required: true
    }
});

// const ledgerSchema = new Schema<LedgerDoc>({
//     ledgers: [orderSchema]

// })

// Definición de modelos

const User: Model<UserDoc> = mongoose.models.User || mongoose.model<UserDoc>("User", userSchema);
const Post: Model<PostDoc> = mongoose.models.Post || mongoose.model<PostDoc>("Post", postSchema);
const Comment: Model<CommentDoc> = mongoose.models.Comment || mongoose.model<CommentDoc>("Comment", commentSchema);
const Product: Model<ProductDoc> = mongoose.models.Product || mongoose.model<ProductDoc>("Product", productSchema);
const Item: Model<ItemDoc> = mongoose.models.Item || mongoose.model<ItemDoc>("Item", itemSchema);
const Cart: Model<CartDoc> = mongoose.models.Cart || mongoose.model<CartDoc>("Cart", cartSchema);
const Order: Model<OrderDoc> = mongoose.models.Order || mongoose.model<OrderDoc>("Order", orderSchema);
// const Ledger: Model<LedgerDoc> = mongoose.models.Ledger || mongoose.model<LedgerDoc>("Ledger", ledgerSchema);
export type {
    UserDoc,
    PostDoc,
    CommentDoc,
    ProductDoc,
    ItemDoc,
    CartDoc,
    OrderDoc,
    // LedgerDoc
}

export {
    User,
    Post,
    Comment,
    Product,
    Item,
    Cart,
    Order,
    // Ledger
};