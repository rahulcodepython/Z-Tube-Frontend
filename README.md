# Z-Tube Frontend

Welcome to the Z-Tube Frontend repository, the user interface component of a dynamic and multifaceted platform that combines the features of social media, e-commerce, and business applications. Developed with the Next.js framework and leveraging the versatility of JavaScript, this project offers a rich, interactive user experience. Z-Tube enables users to engage in a wide range of social activities—posting, tweeting, commenting, chatting—as well as e-commerce functionalities, such as browsing and purchasing items.

## Features

- **Social Media Capabilities**: Users have the ability to create, edit, and delete posts and tweets, engage in lively discussions through comments, and connect with others via chat.
- **E-commerce Integration**: Seamlessly integrated e-commerce capabilities allow users to explore and purchase products directly within the app, providing a unified platform for social and shopping activities.
- **Responsive Design**: Designed with a mobile-first approach to ensure a smooth and responsive user experience across all device types.
- **Modern Technologies**: Built on the Next.js framework, utilizing the latest web technologies for server-side rendering and static site generation to enhance performance and SEO.

## Technologies Used

- **Next.js**: A cutting-edge React framework designed for building single-page JavaScript applications with server-side rendering and static site generation, offering improved performance and user experience.
- **React**: The core JavaScript library for building user interfaces, providing the foundation for the project's frontend development.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without having to leave your HTML, enabling rapid and efficient styling.
- **Shadcn UI Library**: A modern UI library used in conjunction with Tailwind CSS to design beautiful, responsive components.
- **UseContext Hook**: Utilized for state management across the application, allowing for efficient data flow and component reusability without prop drilling.

## Getting Started

To get the Z-Tube frontend up and running on your local machine, follow these steps:

1. Clone the repository:
   ```bash
    git clone https://github.com/rahulcodepython/Z-Tube-Frontend.git
    cd Z-Tube-Frontend
    ```

2. Install the necessary dependencies:
    ```bash
   npm install
    ```

4. Start the development server:
    ```sh
   npm run dev
    ```

Now, the application should be accessible at http://localhost:3000/, ready for you to explore and develop further.

## Usage

1. Write an environment file named ```.env.local``` file:

```
BASE_API_URL='http://localhost:8000'
BASE_APP_URL='http://localhost:3000'
ENCRYPTION_KEY='$2^o%4wAtRy9&6D#5gXq7cBp@K1u*P!zLsI8vJl3fN'
APIKEY=""
AUTHDOMAIN=""
PROJECTID=""
STORAGEBUCKET=""
MESSAGINGSENDERID=""
APPID=""
MEASUREMENTID=""
GOOGLE_OAUTH2_CLIENT_ID=<google auth client id>
GOOGLE_OAUTH2_CLIENT_SECRET=<google auth secret key>
```

Now, the backend server should be running locally, and you can start developing or testing the API endpoints.

## Contributing

Contributions to the Z-Tube frontend are warmly welcomed. Whether it's adding new features, fixing bugs, or improving the documentation, your input is valuable. Please refer to the CONTRIBUTING.md file for more information on how to contribute.
