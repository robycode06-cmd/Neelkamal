import React from 'react';


function FormPage() {
  return (
    <div className="form-container bg-(image:<custom-property>)">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form className="flex flex-col gap-4">
        
        <input type="text"  placeholder="Your Name" required  className="border-black"/>   
       
        <input type="email" id="email" name="email" required className="border-black"/>

      
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default FormPage;
