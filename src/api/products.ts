import { Router, Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { ProductRepository } from '../repositories/productRepo';

const router = Router();
const productService = new ProductService(new ProductRepository());

// GET /api/v1/products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productService.listProducts({}, {});
    res.json({ success: true, data: products, meta: { pagination: {} } });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to list products' } });
  }
});

// GET /api/v1/products/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await productService.getProduct(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: { message: 'Product not found' } });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to get product' } });
  }
});

// POST /api/v1/products
router.post('/', async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to create product' } });
  }
});

// PUT /api/v1/products/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to update product' } });
  }
});

// PATCH /api/v1/products/:id
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to update product' } });
  }
});

// DELETE /api/v1/products/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to delete product' } });
  }
});

// POST /api/v1/products/:id/status
router.post('/:id/status', async (req: Request, res: Response) => {
  try {
    await productService.changeStatus(req.params.id, req.body.status);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to change product status' } });
  }
});

export default router;
