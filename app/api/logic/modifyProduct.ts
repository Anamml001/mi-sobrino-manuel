import { User, Product } from "@/app/data/models";
import { MatchError, SystemError } from "@/app/errors";
import validate from "@/app/validate";

interface ModifyProductInput {
    productId: string;
    name: string;
    image: string;
    stock: boolean;
    price: number;
}

function modifyProduct(userId: string, { productId, name, image, stock, price }: ModifyProductInput): Promise<void> {
    // Validar los parámetros
    validate.id(userId, 'userId');
    validate.id(productId, 'productId');
    validate.name(name);
    validate.url(image);
    validate.stock(stock, 'stock');
    validate.number(price);

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
            if (!user) throw new MatchError('user not found');

            return Product.findById(productId)
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(product => {
            if (!product) throw new MatchError('product not found');

            product.name = name;
            product.image = image;
            product.stock = stock;
            product.price = price;

            return product.save()
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(result => {

        });
}

export default modifyProduct;
