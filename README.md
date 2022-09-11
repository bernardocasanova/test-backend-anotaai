# Backend Analyst Candidate Testing

#### Description

Your challenge is to develop an API, using Node.JS, for a product catalog management application. Thus, you must analyze and convert the user stories below into routes of an application.

#### User stories:

* As a user I would like to register a product so that I can have access to the data of this product in the future (Title, description, price, category)

* I as a user would like to be able to associate and edit a product category;

* As a user I would like to be able to access the list of all products;

* As a user I would like to be able to filter products by name or category;

* I as a user would like to be able to update the product data;

* I as a user would like to be able to delete a product from my catalog;
### Setup
> After clone project, rename the file `.env.example` to `.env`.

> On terminal, at same directory as cloned the project, run the command below (need a docker installed on machine):
```shell
docker-compose up -d
```
### Application Routes

> Default API url
```shell
http://localhost:3000/
```

### Populate Database
> This request will populate the database with 10 products and 3 categories.
```shell
Request type: POST
http://localhost:3000/populate
```

### Category routes
> List all categories
```shell
Request type: GET
url: http://localhost:3000/category
```

> Show a specific category
```shell
Request type: GET
Parameter: id (category id)
url: http://localhost:3000/category/:id
```

> Create category
```shell
Request type: POST
Attributes:
    name: string
Json example:
{
    "name": "Category A"
}
url: http://localhost:3000/category
```

> Update category
```shell
Request type: PUT
Attributes:
    name: string
Parameter: id (category id)
Json example:
{
    "name": "Update category A"
}
url: http://localhost:3000/category/:id
```

> Delete category
```shell
Request type: DELETE
Parameter: id (category id)
url: http://localhost:3000/category/:id
```

### Product routes
> List all products
```shell
Request type: GET
url: http://localhost:3000/product
```

> Show a specific product
```shell
Request type: GET
Parameter: id (product id)
url: http://localhost:3000/product/:id
```

> Create product
```shell
Request type: POST
Attributes:
    title: string,
    description: string,
    price: number,
    category: objectId
Json example:
{
    "title": "Product E",
    "description": "Description for product E",
    "price": 500,
    "category": "631e5e762cdfc1ebe2ddb0da"
}
url: http://localhost:3000/category
```

> Update product
```shell
Request type: PUT
Attributes:
    title: string,
    description: string,
    price: number,
    category: objectId
Parameter: id (product id)
Json example:
{
    "title": "Update Product E",
    "description": "Update description for product E"
}
url: http://localhost:3000/product/:id
```

> Delete product
```shell
Request type: DELETE
Parameter: id (product id)
url: http://localhost:3000/product/:id
```

> Filter product by name or category
```shell
Request type: GET
url:
    Product title: http://localhost:3000/product/filter?title=parameter
    Category name: http://localhost:3000/product/filter?category=parameter
```

## Author

- [@bgcasanova](https://www.github.com/bernardocasanova)


