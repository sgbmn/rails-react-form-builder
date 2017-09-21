import Form from './form.jsx';

export default function formFor(record, options=null){
  return new Form(record, options);
}
