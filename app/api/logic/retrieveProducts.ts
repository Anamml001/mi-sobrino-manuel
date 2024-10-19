import { Product, User } from "@/app/data/models";
import errors from "@/app/errors";
import validate from "@/app/validate";

const { SystemError, MatchError } = errors;

interface ProductDocument {
    id: string;
    name: string;
    image: string;
    stock: boolean;
    price: number;
}

async function retrieveProducts(): Promise<ProductDocument[]> {

    try {


        const products: any[] = await Product.find().select('-__v').lean();

        const transformedProducts: ProductDocument[] = products.map(product => {
            if (product._id) {
                product.id = product._id.toString();
                delete product._id;
            }
            return product as ProductDocument;
        });

        return transformedProducts;

    } catch (error) {
        throw new SystemError((error as Error).message);
    }
}

export default retrieveProducts;

