import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Grab the value directly from the DOM node via ref on submit
    alert(`Submitted value: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="uncontrolled-name">Name (Uncontrolled):</label>
      <input 
        id="uncontrolled-name"
        type="text" 
        // defaultValue="Initial Value" // Use defaultValue instead of value
        ref={inputRef} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledInput;