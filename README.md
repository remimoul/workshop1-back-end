# Workshop 1 MDS M1 - Refonte Retrometroid - API

## Installation

```bash
$ npm install
```

### Running the app using embedded server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running the app using Docker

```bash
$ docker-compose up
```

## Routes

### POST /category/add

Add a new category to the database.

#### Body

```json
{
  
}
```

#### Response

```json
{
  
}
```

### GET /category/all

Get all categories from the database.

#### Response

```json
{

}
```

### GET /category/:id

Get a category by id.

#### Response

```json
{

}
```

### PATCH /category/:id

Update a category by id.

#### Body

```json
{

}
```

#### Response

```json
{

}
```

### DELETE /category/:id

Delete a category by id.

#### Response

```json
{

}
```

### POST /accessory/add

Add a new accessory to the database.

#### Body

```json
{

}
```

#### Response

```json
{

}
```

### GET /accessory/all

Get all accessories from the database.

#### Response

```json
{

}
```

### GET /accessory/:id

Get an accessory by id.

#### Response

```json
{

}
```

### PATCH /accessory/:id

Update an accessory by id.

#### Body

```json
{

}
```

#### Response

```json
{

}
```

### DELETE /accessory/:id

Delete an accessory by id.

#### Response

```json
{

}
```

### GET /images/:imageName

Get an image by name.

#### Response

The image is returned in the response.

### GET /images/front/:imageName

Get a front image by name.

#### Response

The image is returned in the response.

### GET /images/back/:imageName

Get a back image by name.

#### Response

The image is returned in the response.

### GET /images/side/:imageName

Get a side image by name.

#### Response

The image is returned in the response.
