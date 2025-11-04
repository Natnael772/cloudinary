# NestJS Cloudinary File Upload

A simple NestJS application demonstrating file upload and retrieval using Cloudinary.

## Features

Upload files (images, videos) to Cloudinary

Fetch uploaded files

Integrated with NestJS using Multer for file handling

## Prerequisites

Node.js >= 18

npm or yarn

Cloudinary account (with API credentials)

## Installation

### 1. Clone the repository

```bash
git clone http://github.com/Natnael772/cloudinary>
cd cloudinary
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Environment Variables

Create a .env file in the root directory and add your cloudinary credentials:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

### 4. Usage

Start the server

```bash
npm run start:dev
```

or

```bash
yarn start:dev
```

Server will run at http://localhost:3000
