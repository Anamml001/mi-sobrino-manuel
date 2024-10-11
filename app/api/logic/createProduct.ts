import { User, Product, ProductDoc } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

interface ProductData {
    name: string;
    image: string;
    stock: boolean;
    price: number;
}

function createProduct(userId: string, { name, image, stock, price }: ProductData): Promise<ProductDoc> {
    validate.id(userId, 'userId');
    validate.name(name);
    validate.url(image);
    validate.stock(stock, 'stock');
    validate.number(price);

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
            if (!user) throw new MatchError('user not found');

            const date = new Date();

            const product = {
                author: user._id,
                name,
                image,
                price,
                stock,
                date
            };

            return Product.create(product)
                .catch(error => { throw new SystemError((error as Error).message); });
        })
        .then((product: ProductDoc) => {
            return product;
        });
}

export default createProduct;
