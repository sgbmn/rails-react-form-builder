
// var formFor = (record, options=null) => {
//   return new Form(record, options);
// }

export default class Form {
  constructor(record, options=null) {
    this.resources = [];
    this.options = options;
    this.resourceName = Object.keys(record)[0];
    if (this.options) {
      if (this.options.index) {
        this.sourceObject = record[this.resourceName][this.options.index]
      }
      else {
        this.sourceObject = record[this.resourceName];
      }
    }
    else {
      this.sourceObject = record[this.resourceName];
    }

    if (this.options) {
      if(this.options.resources) {
        this.resources = this.options.resources;
      }
    }
    this.resources.push(this.resourceName)
    if (this.options) {
      if (this.options.resources) {
        this.resources.push('attributes')
      }
      if (this.options.index) {
        this.resources.push(this.options.index);
      }
    }
  }

  inputId(fieldName) {
    return(this.resources.join('_')+'_'+fieldName);
  }

  inputName(fieldName) {
    return(this.resources[0]+this.resources.slice(1,-1).map((r) => `[${r}]`).join('')+`[${fieldName}]`);
  }

  textField(fieldName) {
    return <input id={this.inputId(fieldName)}  name={this.inputName(fieldName)} value={this.sourceObject[fieldName]} />
  }

  fieldsFor(recordName, record_object=null) {
    var options = {};
    options.resources = this.resources;

    if (record_object) {
      options.index = `${this.sourceObject[recordName].findIndex( record => record.id == record_object.id )}`;
    }

    var obj = {};
    obj[recordName] = this.sourceObject[recordName];
    return new Form(obj, options);
  }
}
