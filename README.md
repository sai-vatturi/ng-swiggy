# Swiggy Front End Implemenation using Angular and Tailwind

This project is a front-end clone of the Swiggy website, developed using Angular. It simulates essential UI elements and user interactions on a food discovery platform. 

Vercel Deployment Link: [https://ng-swiggy.vercel.app](https://ng-swiggy.vercel.app/)


I have included all the features and followed implementation details that was mentioned in the requirement document here: [Mini Project_ Swiggy Clone Using Angular.pdf](https://github.com/user-attachments/files/17674299/Mini.Project_.Swiggy.Clone.Using.Angular.1.pdf)

Run `npm install` to install the required packages. 
Run `ng serve` to start the live server.

## Project Highlights

- **Custom Dataset**:
  - A unique dataset simulating real-world restaurant information, menu items, user reviews, and more.
  - Includes location-based filtering, allowing users to view restaurants and menu items specific to their selected location.
  - Custom Dataset link: [data.json](https://github.com/sai-vatturi/ng-swiggy/blob/main/src/assets/data/data.json)

- **Dynamic Image Integration**:
  - Utilizes images from [Picsum](https://picsum.photos/) to simulate a variety of food and restaurant images, creating a realistic visual experience.

- **Authentication**:
  - Integrated with MockAPI for user login and registration.
  - Saved login credentials and order details stored in MockAPI at:
    - **Users**: [https://6728d0196d5fa4901b6b0a9c.mockapi.io/api/users](https://6728d0196d5fa4901b6b0a9c.mockapi.io/api/users)
    - **Orders**: [https://6728d0196d5fa4901b6b0a9c.mockapi.io/api/orders](https://6728d0196d5fa4901b6b0a9c.mockapi.io/api/orders)

- **Order Selection Page**:
  - Added an **Order Selection** page that enables users to:
    - **Order by Category**: Browse food items by different categories (e.g., Biryani, Pizzas, Desserts).
    - **Order by Restaurant**: Explore available restaurants for direct ordering.
  
- **Homepage**:
  - Displays featured restaurants and popular cuisines using the custom dataset.
  - Includes a search bar for filtering food by name, enhancing the search experience.

- **Favorites Page**:
  - Lists user’s favorite food items, managed with Angular services or `localStorage`.
 
- **Sorting Options**:
  - Users can sort restaurants and menu items by Rating, Price, Delivery Time, Veg / Non Veg, Etc...
  - Sorting controls are available in the Order Selection Page and Restaurant Listings.

- **Cart Simulation**:
  - "Add to Cart" feature with real-time price calculation.
  - A dedicated cart page to display selected items and total cost.

- **Static Data Management**:
  - Angular services store arrays for restaurant details, menu items, and reviews.
  - Manages favorites and cart items with Angular services or `localStorage`.

- **Location-Based Filtering**:
  - Enables users to filter restaurants and menu items based on selected location.
 



## Technical Implementation

- **Components**:
  - Reusable components for restaurant cards, menu items, and user reviews.

- **Routing**:
  - Angular Router for navigating between pages (home, order selection, listings, restaurant details, favorites, and cart).

- **Responsive Design**:
  - Optimized for mobile and desktop views.

- **State Management**:
  - Favorites and cart states managed through Angular services.
