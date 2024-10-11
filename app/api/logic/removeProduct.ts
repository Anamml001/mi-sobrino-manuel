import { User, Product } from "@/app/data/models";
import { MatchError, SystemError } from "@/app/errors";
import validate from "@/app/validate";

function removeProduct(userId: string, productId: string): Promise<void> {

    validate.id(userId, 'userId');
    validate.id(productId, 'productId');

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
            if (!user) throw new MatchError('user not found');

            return Product.findById(productId)
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(product => {
            if (!product) throw new MatchError('product not found');

            return Product.deleteOne({ _id: product._id })
                .catch(error => { throw new SystemError((error as Error).message); });
        })
        .then(result => {

        });
}

export default removeProduct;
