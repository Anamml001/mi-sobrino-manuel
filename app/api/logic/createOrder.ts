import { User, Product, Order, Ledger, Cart, Item as CartItem } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

interface Item {
    id: string;
    description: string;
    quantity: number;
}

async function createOrder(userId: string, items: Item[], shippingAddress: string, phoneNumber: number): Promise<void> {
    validate.id(userId, 'userId');
    items.forEach(item => {
        validate.id(item.id);
        validate.number(item.quantity);
    });
    validate.text(shippingAddress, 'shippingAddress');
    validate.number(phoneNumber);

    const user = await User.findById(userId).catch(error => {
        throw new SystemError(error.message);
    });

    if (!user) throw new MatchError('user not found');

    const cart = new Cart();
    const promises = items.map(async item => {
        const product = await Product.findById(item.id).catch(error => {
            throw new SystemError(error.message);
        });

        if (!product) throw new MatchError('product not found');

        if (!product.stock) {
            throw new MatchError('insufficient stock');
        }

        cart.items.push(new CartItem({ product, quantity: item.quantity }));

        await product.save().catch(error => {
            throw new SystemError(error.message);
        });
    });

    await Promise.all(promises);

    const order = new Order({
        buyer: userId,
        cart: cart,
        date: new Date(),
        shippingAddress: shippingAddress
    });

    await order.save().catch(error => {
        throw new SystemError(error.message);
    });


}

export default createOrder;

