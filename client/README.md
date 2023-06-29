Jumbo Bowls poke bowl online store.

Full stack application with express backend, MongoDB database and Vue 3 frontend. Typescript supported both on the front and the back. Tailwind CSS on the front.

For use authentication I used jason web token workflow. Token is saved in local storage, sent from the client and then decoded on the backend on authentication and particular requests.

For state managment on the front I used Pinia. Stores are to be find in stores folder, and hooks relevant to the state data are in hooks folder.

MODELS:
Users / Products / Reviews

FEATURES:

- Signup / login / logut / deactivate account.
- Overview of the products on the /products page (GET request).
- Single product page where more info about the particular product is displayed (GET request).
- Write a review and add a rating for a product (POST request, real time updates on the client).
- Users can edit or deactivate their accounts (PATCH and DELETE requests, real time updates on the client).
- Admin dashboard: control user information. Deactivate their accounts or update relevant information. (PATCH request, Authorization middleware running on the backend preventing non admin users from reaching /dashobard page).
