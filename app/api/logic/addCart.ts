import { User, Product, Cart, CartDoc, Item as CartItem } from "@/app/data/models";
import { SystemError, MatchError, ContentError } from "@/app/errors";
import validate from "@/app/validate";

interface Item {
    id: string;
    description: string;
    quantity: number;
}

async function addCart(userId: string, items: Item[]): Promise<CartDoc> {
    try {

        validate.id(userId, 'userId');
        items.forEach(item => {
            if (typeof item.id !== 'string') {
                throw new ContentError('id is not a string');
            }
            validate.id(item.id);
            validate.number(item.quantity);
        });

        const user = await User.findById(userId);
        if (!user) {
            throw new MatchError('user not found');
        }

        const cart = new Cart({ user: user._id });

        const productPromises = items.map(async item => {
            const product = await Product.findById(item.id);
            if (!product) {
                throw new MatchError('product not found');
            }

            if (!product.stock) {
                throw new MatchError('insufficient stock');
            }

            cart.items.push(new CartItem({ product, quantity: item.quantity }));

            await product.save();
        });

        await Promise.all(productPromises);

        const savedCart = await cart.save();
        return savedCart;

    } catch (error) {
        throw new SystemError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
}

export default addCart;

