# rails-react-form-builder

Generates resource-orientated form elements with Rails style naming.

## Installation
### NPM
```bash
npm install rails-react-form-builder --save
```
### Yarn
```bash
yarn add rails-react-form-builder
```

## Usage
Given you have some associations...
```ruby
# app/models/user.rb
class User < ActiveRecord::Base
  has_many :contacts
  accepts_nested_attributes :contacts
end

# app/models/contact.rb
class Contact < ActiveRecord::Base
  has_many :email_addresses
  accepts_nested_attributes :email_addresses
end

# app/models/email_address.rb
class EmailAddress < ActiveRecord::Base
end
```

...and output some JSON...
```ruby
# app/controllers/email_addresses_controller.rb
class EmailAddressesController < ApplicationController
  def index
    User.find(params[:id]).
    includes(contacts: [:email_addresses]).
    as_json(
      root: true,
      include: contacts: [:email_addresses]
    )
  end
```

...build some form elements in javascript.
```javascript
import formFor from 'rails-react-form-builder';

var user = getRemoteResource('users/1000/email_addresses.json');

f = formForm(user);
f.textField('first_name');
f.textField('last_name');

f.contacts.each( (contact) => {
  ff = f.fieldsFor('contact', contact);
  ff.textField('first_name');
  ff.textField('last_name');

  ff.email_addresses.each( (email) => {
    fff = ff.fieldsFor("email_address",  email)
    fff.textField('address');
  })
})
```
