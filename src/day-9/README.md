# Database design

[[toc]]

## Getting started

### Introduction to database design

```
Customers: {
  name;
  address;
  city;
  state;
  mobileNumber;
  emailAddress;
}
```

```
Products: {
  name;
  description;
  price;
  unitsInStock;
}
```

```
Suppliers: {
  name;
  address;
  city;
  state;
  mobileNumber;
  emailAddress;
}
```

```
Orders: {
  orderNumber;
  salesPerson;
  date;
  orderItems;
  total;
}
```

```
OrderItem: {
  product;
  quantity;
}
```

### 