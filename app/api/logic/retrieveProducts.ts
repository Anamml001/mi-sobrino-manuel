import { User, Product } from "@/app/data/models";
import { MatchError, SystemError } from "@/app/errors";
import validate from "@/app/validate";

// Definición de tipos para productos
interface ProductDocument {
    id: string;
    name: string;
    image: string;
    stock: boolean;
    price: number;
}

async function retrieveProducts(userId: string): Promise<ProductDocument[]> {

    try {
        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) throw new MatchError('user not found');

        // Obtener productos de la base de datos
        const products: any[] = await Product.find().select('-__v').lean(); // Usar lean() para obtener objetos planos

        // Transformar los productos a un formato adecuado
        const transformedProducts: ProductDocument[] = products.map(product => ({
            id: product._id.toString(), // Convertir _id a string
            name: product.name,
            image: product.image,
            stock: product.stock,
            price: product.price
        }));

        // Retornar los productos transformados
        return transformedProducts;

    } catch (error) {
        // Manejar errores y lanzar un SystemError
        throw new SystemError((error as Error).message);
    }
}

export default retrieveProducts;
