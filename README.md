Jumbo Bowls poke bowl online store

Full stack application with express backend, MongoDB database and Vue 3 frontend. Typescript supported both on the front and the back. Tailwind CSS on the front.

AUTHENTICATION:
Jason web token workflow. Token is saved in local storage, sent from the client and then decoded on the backend on authentication and particular requests.

MODELS:
Users / Products / Reviews

STATE MANAGMENT:
Pinia. Stores are to be find in stores folder, and hooks relevant to the state data are in hooks folder.

FEATURES:

- Signup / login / logut / deactivate account.
- Overview of the products on the /products page (GET request).
- Single product page where more info about the particular product is displayed (GET request).
- Write a review and add a rating for a product (POST request, real time updates on the client).
- Users can edit or deactivate their accounts (PATCH & DELETE requests, real time updates on the client).
- Users can update their profile photo. (A default photo is provided from the backend initially). This is PATCH request, processed with multer middleware on the backend.
- Admin dashboard: control user information. Deactivate, delete their accounts or update relevant information. (PATCH & DELETE requests, Authorization middleware running on the backend preventing non admin users from reaching /dashobard page).

TECHNOLOGIES USED:

- Node
- Express
- MongoDB
- Mongoose
- JWT
- Vue 3 (pina, vue router)
- zod
- Tailwind CSS
- Typescript

NOTES:
This project was built for a frontend position related interview. With that in mind, in order to demonstrate javascript knowledge on the front, some choices were made that wouldn't be made in a product production ready application. The most important one:
Ratings for a product are computed on the frontend on new review (on new POST request which updates the database, in order to synchronize the state). Also, on initial fetch (all products, where ratings for each product are displayed) the reviews array is included with the .select from mongoose, which is not ideal + the cost of the computation. This is not ideal for the performance and should be done on the backend.
