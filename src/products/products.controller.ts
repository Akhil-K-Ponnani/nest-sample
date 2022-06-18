import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    addProduct(@Body('name') name: string, @Body('description') description: string, @Body('price') price: number): {} {
        if (name && description && price)
            return this.productsService.addProduct({ name, description, price })
        else
            throw new NotFoundException('Product details not found.')
    }

    @Get()
    getAllProducts(): Promise<any> {
        return this.productsService.getAllProducts()
    }

    @Get(':id')
    getProduct(@Param('id') productId: string): {} {
        if (productId)
            return this.productsService.getProduct(productId)
        else
            throw new NotFoundException('Product id not found.')
    }

    @Put(':id')
    updateProduct(@Param('id') productId: string, @Body('name') name: string, @Body('description') description: string, @Body('price') price: number): {} {
        if (productId && name && description && price)
            return this.productsService.updateProduct(productId, { name, description, price })
        else
            throw new NotFoundException('Product details not found.')
    }

    @Delete(':id')
    deleteProduct(@Param('id') productId: string): {} {
        if (productId)
            return this.productsService.deleteProduct(productId)
        else
            throw new NotFoundException('Product id not found.')
    }
}