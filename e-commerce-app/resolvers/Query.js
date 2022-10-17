

exports.Query = {
    hello: (parent, args, context) => {
        return "Hello World!"
    },
    products: (parent, { filter }, { products, reviews }) => {
        let filteredProducts = products;
        if (filter) {
            const { onSale, avgRating } = filter;
            if (onSale) {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.onSale;
                });
            }
            if ([1, 2, 3, 4, 5].includes(avgRating)) {
                filteredProducts = filteredProducts.filter((product) => {
                    let sumRating = 0;
                    let numberOfReviews = 0;
                    reviews.forEach((review) => {
                        if (review.productId === product.id) {
                            sumRating += review.rating;
                            numberOfReviews++;
                        }
                    });
                    const avgProductRating = sumRating / numberOfReviews;

                    return avgProductRating >= avgRating;
                });
            }
        }

        return filteredProducts;
    },
    product: (parent, args, { products }) => {
        const productId = args.id

        return product = products.find(product => product.id === productId)

    },
    categories: (parent, args, { categories }) => {
        return categories
    },
    category: (parent, args, { categories }) => {
        const categoryId = args.id;

        const category = categories.find(category => category.id === categoryId)
        return category
    }
}