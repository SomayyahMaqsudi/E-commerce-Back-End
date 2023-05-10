const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// router.get('/', async (req, res) => {
//     try {
//       const dbProductData = await Product.findAll({
//         attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
router.get('/', (req, res) => {

    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            {
                model: Tag,
                attributes: ['id', 'tag_name']
            }
        ]
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {

    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            {
                model: Tag,
                attributes: ['id', 'tag_name']
            }
        ]
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product was found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {
    Product.create(req.body)
        .then((product) => {
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});


router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });

            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product was found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;



// import express from 'express';
// import { Product, Category, Tag, ProductTag } from '../../models';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const dbProductData = await Product.findAll({
//       attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
//       include: [
//         {
//           model: Category,
//           attributes: ['id', 'category_name']
//         },
//         {
//           model: Tag,
//           attributes: ['id', 'tag_name']
//         }
//       ]
//     });
//     res.json(dbProductData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const dbProductData = await Product.findOne({
//       where: {
//         id: req.params.id
//       },
//       attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
//       include: [
//         {
//           model: Category,
//           attributes: ['id', 'category_name']
//         },
//         {
//           model: Tag,
//           attributes: ['id', 'tag_name']
//         }
//       ]
//     });
//     if (!dbProductData) {
//       res.status(404).json({ message: 'No product was found with this id' });
//       return;
//     }
//     res.json(dbProductData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     if (req.body.tagIds.length) {
//       const productTagIdArr = req.body.tagIds.map((tag_id) => {
//         return {
//           product_id: product.id,
//           tag_id,
//         };
//       });
//       await ProductTag.bulkCreate(productTagIdArr);
//     }
//     res.status(200).json(product);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     await Product.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
//     const productTagIds = productTags.map(({ tag_id }) => tag_id);
//     const newProductTags = req.body.tagIds
//       .filter((tag_id) => !productTagIds.includes(tag_id))
//       .map((tag_id) => {
//         return {
//           product_id: req.params.id,
//           tag_id,
//         };
//       });

//     const productTagsToRemove = productTags
//       .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//       .map(({ id }) => id);

//     await Promise.all([
//       ProductTag.destroy({ where: { id: productTagsToRemove } }),
//       ProductTag.bulkCreate(newProductTags),
//     ]);

//     res.json(productTagsToRemove);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



// router.delete('/:id', (req, res) => {
//     Product.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbProductData => {
//             if (!dbProductData) {
//                 res.status(404).json({ message: 'No product was found with this id' });
//                 return;
//             }
//             res.json(dbProductData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// module.exports = router;