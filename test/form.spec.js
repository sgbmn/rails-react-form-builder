
var expect = require('chai').expect;
import Form from '../src/form';

describe('Form', function() {
  let resource;
  let f;

   beforeEach(() => {
     resource = {
       user: {
         id: 1,
         first_name: "John",
         last_name: "Doe",
         emails: [{
           address: 'jd@rails-react-form-builder.com',
           contacts: [{
             name: "contact 1"
           }, {
             name: "contact 2"
          }]
        }, {
          address: 'jane@rails-react-form-builder.com',
          contacts: [{
            name: "contact 3"
          }, {
            name: "contact 4"
          }]
        }]
      }
    }
    f = new Form(resource);
  });

  describe('#fieldsFor', function() {
    it('should return a form');//, function() {
    //   expect(form.fieldsFor("emails")).to.be.a("Form")
    // });
  });

  describe('#inputId', () => {
    it("returns an unnested id", () => {
      expect(f.inputId("first_name")).to.equal("user_first_name");
    });

    context("when nested", () => {
      let ff;

      beforeEach( () => {
        ff = f.fieldsFor("emails", f.sourceObject["emails"][0]);
      });

      it("returns a single nested id", () => {
        expect(ff.inputId("address")).to.equal("user_emails_attributes_0_address");
      })

      context("and then nested again", () => {
        let fff;

        beforeEach( () => {
          fff = ff.fieldsFor("contacts", ff.sourceObject["contacts"][0]);
        });

        it("returns a double nestesd id", () => {
          expect(fff.inputId("name")).to.equal("user_emails_attributes_0_contacts_attributes_0_name");
        });
      });
    });
  });

  describe("#inputName", () => {

  });

  describe("#textField", () => {

  })
});
