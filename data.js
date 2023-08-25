 const products = [
    {
      name: 'Apple',
      desc: 'A sweet and crunchy fruit.',
      photoArray: [{ url: 'apple.jpg' }],
      price: 1.5,
      discount: 0,
      category: 'Fruits'
    },
    {
      name: 'Carrot',
      desc: 'A nutritious and crunchy vegetable.',
      photoArray: [{ url: 'carrot.jpg' }],
      price: 0.75,
      discount: 0,
      category: 'Vegetables'
    },
    {
      name: 'Orange',
      desc: 'A citrus fruit bursting with flavor.',
      photoArray: [{ url: 'orange.jpg' }],
      price: 1.2,
      discount: 0,
      category: 'Fruits'
    },
    {
      name: 'Broccoli',
      desc: 'A nutrient-rich green vegetable.',
      photoArray: [{ url: 'broccoli.jpg' }],
      price: 1.0,
      discount: 0,
      category: 'Vegetables'
    },
    {
      name: 'Banana',
      desc: 'A tropical and energy-packed fruit.',
      photoArray: [{ url: 'banana.jpg' }],
      price: 0.5,
      discount: 0,
      category: 'Fruits'
    },
  ];

  const users = [
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      password: 'password123', 
      phone: 1234567890,
      address: '123 Main Street',
      usertype: 'admin',
      boughtProducts: [] 
    },
    {
      firstname: 'Alice',
      lastname: 'Smith',
      email: 'alice@example.com',
      password: 'securepass', 
      phone: 9876543210,
      address: '456 Elm Avenue',
      usertype: 'buyer',
      boughtProducts: [] 
    },
    {
      firstname: 'David',
      lastname: 'Johnson',
      email: 'david@example.com',
      password: 'strongpass', 
      phone: 5551234567,
      address: '789 Oak Lane',
      usertype: 'buyer',
      boughtProducts: [] 
    },
    {
      firstname: 'Ella',
      lastname: 'Williams',
      email: 'ella@example.com',
      password: 'password123', 
      phone: 8889876543,
      address: '101 Maple Street',
      usertype: 'buyer',
      boughtProducts: []
    },
  ];

module.exports = {
  users,
  products
}
  